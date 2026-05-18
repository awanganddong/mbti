function getApiBaseUrl() {
  const app = getApp();
  const baseUrl = app && app.globalData ? app.globalData.apiBaseUrl : '';
  return String(baseUrl || '').replace(/\/+$/, '');
}

// 多数 Nginx 默认 client_max_body_size 为 1MB，上传前压到该阈值以下
const UPLOAD_MAX_BYTES = 900 * 1024;

function compressImageWithQuality(src, quality, finish) {
  if (!wx.compressImage) {
    finish(src);
    return;
  }
  wx.compressImage({
    src,
    quality,
    compressedWidth: 1280,
    success: (res) => finish((res && res.tempFilePath) || src),
    fail: () => finish(src),
  });
}

function prepareImageForUpload(filePath) {
  const path = String(filePath || '').trim();
  if (!path) {
    return Promise.resolve('');
  }
  if (!wx.getFileInfo) {
    return Promise.resolve(path);
  }
  return new Promise((resolve) => {
    wx.getFileInfo({
      filePath: path,
      success: (info) => {
        if (!info || info.size <= UPLOAD_MAX_BYTES) {
          resolve(path);
          return;
        }
        let quality = 75;
        let current = path;
        const tryCompress = () => {
          compressImageWithQuality(current, quality, (compressed) => {
            if (!compressed) {
              resolve(path);
              return;
            }
            wx.getFileInfo({
              filePath: compressed,
              success: (next) => {
                if (!next || next.size <= UPLOAD_MAX_BYTES || quality <= 35) {
                  resolve(compressed);
                  return;
                }
                current = compressed;
                quality -= 20;
                tryCompress();
              },
              fail: () => resolve(compressed),
            });
          });
        };
        tryCompress();
      },
      fail: () => resolve(path),
    });
  });
}

/** 仅真实公网图片 URL 走 JSON；微信临时路径如 http://tmp/xxx 必须用 uploadFile */
export function isRemoteImageURL(path) {
  const p = String(path || '').trim();
  if (!p || !/^https?:\/\//i.test(p)) return false;
  if (/^https?:\/\/(tmp|usr|store)\//i.test(p)) return false;
  if (/^wxfile:\/\//i.test(p)) return false;
  return true;
}

export function analyzeHiddenPersona(payload) {
  const body = payload || {};
  const description = String(body.description || '');
  const descriptionEncoded = encodeURIComponent(description);
  return new Promise((resolve, reject) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
      reject(new Error('未配置后端地址'));
      return;
    }
    const filePath = String(body.filePath || '');
    if (filePath && !isRemoteImageURL(filePath)) {
      prepareImageForUpload(filePath)
        .then((uploadPath) => {
          if (!uploadPath) {
            reject(new Error('图片无效'));
            return;
          }
          wx.uploadFile({
            url: `${baseUrl}/hidden/analyze`,
            filePath: uploadPath,
            name: 'image',
            timeout: 45000,
            formData: {
              uid: String(body.uid || 0),
              description: '',
              descriptionEncoded,
              hasPhoto: 'true',
            },
            success: (res) => {
              let data = null;
              try {
                data = res && res.data ? JSON.parse(res.data) : null;
              } catch (e) {
                reject(new Error('后端返回格式错误'));
                return;
              }
              if (!data) {
                reject(new Error('后端返回为空'));
                return;
              }
              if (data.code !== 200) {
                const msg = data.msg || '分析失败';
                reject(new Error(res.statusCode === 413 ? '图片过大，请换一张较小的照片' : msg));
                return;
              }
              resolve(data.data);
            },
            fail: (err) => {
              const msg = err && err.errMsg ? String(err.errMsg) : '';
              if (msg.indexOf('413') >= 0) {
                reject(new Error('图片过大，请换一张较小的照片'));
                return;
              }
              reject(new Error('图片上传失败'));
            },
          });
        })
        .catch(() => reject(new Error('图片处理失败')));
      return;
    }

    wx.request({
      url: `${baseUrl}/hidden/analyze`,
      method: 'POST',
      timeout: 45000,
      header: {
        'content-type': 'application/json',
      },
      data: {
        ...body,
        description,
        descriptionEncoded,
      },
      success: (res) => {
        const data = res && res.data ? res.data : null;
        if (!data) {
          reject(new Error('后端返回为空'));
          return;
        }
        if (data.code !== 200) {
          reject(new Error(data.msg || '分析失败'));
          return;
        }
        resolve(data.data);
      },
      fail: () => reject(new Error('网络请求失败')),
    });
  });
}
