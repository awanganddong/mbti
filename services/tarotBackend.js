function getApiBaseUrl() {
  const app = getApp();
  const baseUrl = app && app.globalData ? app.globalData.apiBaseUrl : '';
  return String(baseUrl || '').replace(/\/+$/, '');
}

function request(options) {
  return new Promise((resolve, reject) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
      reject(new Error('未配置后端地址'));
      return;
    }

    wx.request({
      url: `${baseUrl}${options.path}`,
      method: options.method || 'GET',
      timeout: options.timeout || 20000,
      header: Object.assign(
        {
          'content-type': 'application/json'
        },
        options.header || {}
      ),
      data: options.data || undefined,
      success: (res) => {
        const payload = res && res.data ? res.data : null;
        if (!payload) {
          reject(new Error('后端返回为空'));
          return;
        }
        if (payload.code !== 200) {
          reject(new Error(payload.msg || '请求失败'));
          return;
        }
        resolve(payload.data);
      },
      fail: () => {
        reject(new Error('网络请求失败'));
      }
    });
  });
}

export function getTarotUid() {
  const uid = Number(wx.getStorageSync('tarotUid') || 0);
  return Number.isFinite(uid) ? uid : 0;
}

export function setTarotUid(uid) {
  const next = Number(uid || 0);
  if (next > 0) {
    wx.setStorageSync('tarotUid', next);
  }
  return next;
}

export function tarotLogin(profile) {
  const p = profile || {};
  const nickName = String(p.nickName || '').trim();
  const avatarUrl = String(p.avatarUrl || '').trim();
  if (!nickName || !avatarUrl) {
    return Promise.reject(new Error('缺少头像或昵称'));
  }

  return new Promise((resolve, reject) => {
    wx.login({
      success: (loginRes) => {
        const code = loginRes && loginRes.code ? loginRes.code : '';
        if (!code) {
          reject(new Error('获取登录 code 失败'));
          return;
        }
        request({
          path: '/tarot/saveUserInfo',
          method: 'POST',
          data: {
            code,
            nickName,
            avatarUrl,
            gender: Number(p.gender || 0),
            city: String(p.city || ''),
            province: String(p.province || ''),
            country: String(p.country || '')
          }
        })
          .then((data) => {
            const uid = data && data.uid ? Number(data.uid) : 0;
            if (uid > 0) {
              setTarotUid(uid);
            }
            resolve({ uid, raw: data });
          })
          .catch(reject);
      },
      fail: () => reject(new Error('微信登录失败'))
    });
  });
}

export function fetchTarotUserInfo(uid) {
  const userId = Number(uid || getTarotUid() || 0);
  if (userId <= 0) {
    return Promise.reject(new Error('未登录'));
  }
  return request({
    path: `/tarot/user?uid=${encodeURIComponent(String(userId))}`,
    method: 'POST'
  });
}

export function addTarotScore(uid, delta) {
  const userId = Number(uid || getTarotUid() || 0);
  const score = Number(delta || 0);
  if (userId <= 0) {
    return Promise.reject(new Error('未登录'));
  }
  if (!Number.isFinite(score) || score === 0) {
    return Promise.reject(new Error('积分变更值非法'));
  }
  return request({
    path: `/tarot/user/edit?uid=${encodeURIComponent(String(userId))}&score=${encodeURIComponent(String(score))}`,
    method: 'POST'
  });
}

