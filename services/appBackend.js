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

export function fetchTestCatalog() {
  return request('/app/testCatalog').then((data) => {
    const list = data && Array.isArray(data.testCatalog) ? data.testCatalog : [];
    return list;
  });
}

export function fetchMbtiTypeGroups() {
  return request('/mbti/types').then((data) => {
    const list = data && Array.isArray(data.personalityClassGroups) ? data.personalityClassGroups : [];
    return list;
  });
}

export function fetchMbtiQuestions() {
  return request('/mbti/questions').then((data) => {
    const list = data && Array.isArray(data.questions) ? data.questions : [];
    return list;
  });
}

export function fetchQuizQuestions(key) {
  const k = encodeURIComponent(String(key || '').trim());
  return request(`/quiz/${k}/questions`).then((data) => {
    const list = data && Array.isArray(data.questions) ? data.questions : [];
    return list;
  });
}

export function fetchTarotDeck() {
  return request('/tarot/deck').then((data) => {
    const list = data && Array.isArray(data.tarotDeck) ? data.tarotDeck : [];
    return list;
  });
}

