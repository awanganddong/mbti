Page({
  data: {
    lastRecord: null,
    question: '',
    tarotImageUrl: '',
    canDraw: false,
    isLoggedIn: false,
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });

    const app = getApp();
    const base = app && app.globalData ? app.globalData.cdnBaseUrl : '';
    this.setData({
      tarotImageUrl: base ? `${base}tarot.png` : 'https://qiniu.vev3.com/tarot.png'
    });
  },

  onShow() {
    const history = wx.getStorageSync('tarotHistory') || [];
    const lastRecord = history.length > 0 ? history[0] : null;

	const uid = Number(wx.getStorageSync('tarotUid') || 0);
	const profile = wx.getStorageSync('userProfile') || null;
	const isLoggedIn = uid > 0 && !!(profile && profile.avatarUrl && profile.nickName);
	const question = String(this.data.question || '');
    this.setData({
      lastRecord,
		isLoggedIn,
		canDraw: isLoggedIn && question.trim().length > 0
    });
  },

  onShareAppMessage() {
    return {
      title: '抽一张塔罗牌：看看今天的指引',
      path: '/pages/tarot/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '抽一张塔罗牌',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onQuestionInput(e) {
    const value = e && e.detail ? e.detail.value : '';
    const question = String(value || '');
	const uid = Number(wx.getStorageSync('tarotUid') || 0);
	const profile = wx.getStorageSync('userProfile') || null;
	const isLoggedIn = uid > 0 && !!(profile && profile.avatarUrl && profile.nickName);
    this.setData({
      question,
		isLoggedIn,
      canDraw: isLoggedIn && question.trim().length > 0
    });
  },

  goLogin() {
    wx.switchTab({
      url: '/pages/me/index'
    });
  },

  drawOne() {
    const question = String(this.data.question || '').trim();
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '请先登录',
        content: '登录后才可以抽卡并保存你的记录。',
        confirmText: '去登录',
        success: (res) => {
          if (res && res.confirm) {
            this.goLogin();
          }
        }
      });
      return;
    }
    if (!question) {
      wx.showToast({
        title: '请先输入问题',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/tarot/effect/index?q=${encodeURIComponent(question)}`
    });
  },

  viewLast() {
    const last = this.data.lastRecord;
    if (!last || !last.timestamp) return;
    wx.navigateTo({
      url: `/pages/tarot/result/index?drawId=${last.timestamp}`
    });
  },
});
