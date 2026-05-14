const { SHARE_IMG, registerShareMenu, shareTimelineTip } = require('../../../utils/resultShare');

Page({
  data: {
    totalScore: 0,
    maxScore: 54,
    tierLabel: '',
    tierDesc: '',
  },

  onLoad() {
    registerShareMenu();
    const pack = wx.getStorageSync('avpdLastResultView') || {};
    const totalScore = Number(pack.totalScore) || 0;
    const maxScore = Number(pack.maxScore) || 54;
    const tierLabel = String(pack.tierLabel || '').trim();
    const tierDesc = String(pack.tierDesc || '').trim();
    if (!tierLabel) {
      wx.showToast({ title: '暂无结果', icon: 'none' });
      return;
    }
    this.setData({ totalScore, maxScore, tierLabel, tierDesc });
  },

  onShareAppMessage() {
    const t = String(this.data.tierLabel || '').trim() || '回避型人格倾向筛查';
    return {
      title: `我的筛查结果：${t}`,
      path: '/pages/avpd/index',
      imageUrl: SHARE_IMG,
    };
  },

  onShareTimeline() {
    const t = String(this.data.tierLabel || '').trim() || '回避型人格倾向筛查';
    return {
      title: `筛查结果：${t}`,
      query: '',
      imageUrl: SHARE_IMG,
    };
  },

  shareTimelineTip,

  goRetest() {
    wx.redirectTo({ url: '/pages/avpd/index' });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },
});
