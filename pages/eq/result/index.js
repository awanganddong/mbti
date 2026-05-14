const { SHARE_IMG, registerShareMenu, shareTimelineTip } = require('../../../utils/resultShare');

Page({
  data: {
    totalScore: 0,
    maxScore: 80,
    tierLabel: '',
    tierDesc: '',
  },

  onLoad() {
    registerShareMenu();
    const pack = wx.getStorageSync('eqLastResultView') || {};
    const totalScore = Number(pack.totalScore) || 0;
    const maxScore = Number(pack.maxScore) || 80;
    const tierLabel = String(pack.tierLabel || '').trim();
    const tierDesc = String(pack.tierDesc || '').trim();
    if (!tierLabel) {
      wx.showToast({ title: '暂无结果', icon: 'none' });
      return;
    }
    this.setData({ totalScore, maxScore, tierLabel, tierDesc });
  },

  onShareAppMessage() {
    const t = String(this.data.tierLabel || '').trim() || '情商自测';
    return {
      title: `我的情商自测：${t}`,
      path: '/pages/eq/index',
      imageUrl: SHARE_IMG,
    };
  },

  onShareTimeline() {
    const t = String(this.data.tierLabel || '').trim() || '情商自测';
    return {
      title: `情商自测：${t}`,
      query: '',
      imageUrl: SHARE_IMG,
    };
  },

  shareTimelineTip,

  goRetest() {
    wx.redirectTo({ url: '/pages/eq/index' });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },
});
