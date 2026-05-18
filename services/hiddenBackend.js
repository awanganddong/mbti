function getApiBaseUrl() {
  const app = getApp();
  const baseUrl = app && app.globalData ? app.globalData.apiBaseUrl : '';
  return String(baseUrl || '').replace(/\/+$/, '');
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
    if (filePath && filePath.indexOf('http') !== 0) {
      wx.uploadFile({
        url: `${baseUrl}/hidden/analyze`,
        filePath,
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
            reject(new Error(data.msg || '分析失败'));
            return;
          }
          resolve(data.data);
        },
        fail: () => reject(new Error('图片上传失败')),
      });
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
