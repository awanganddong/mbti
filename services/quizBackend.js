function getApiBaseUrl() {
  const app = getApp();
  const baseUrl = app && app.globalData ? app.globalData.apiBaseUrl : '';
  return String(baseUrl || '').replace(/\/+$/, '');
}

function request(path) {
  return new Promise((resolve, reject) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
      reject(new Error('未配置后端地址'));
      return;
    }
    wx.request({
      url: `${baseUrl}${path}`,
      method: 'GET',
      timeout: 20000,
      header: {
        'content-type': 'application/json'
      },
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
      fail: () => reject(new Error('网络请求失败'))
    });
  });
}

export function fetchQuizQuestions(key) {
  const k = String(key || '').trim();
  if (!k) return Promise.reject(new Error('缺少题库标识'));
  return request(`/quiz/${encodeURIComponent(k)}/questions`).then((data) => {
    const questions = data && Array.isArray(data.questions) ? data.questions : [];
    return questions;
  });
}

export function fetchQuizConfig(key) {
  const k = String(key || '').trim();
  if (!k) return Promise.reject(new Error('缺少题库标识'));
  return request(`/quiz/${encodeURIComponent(k)}/questions`);
}
