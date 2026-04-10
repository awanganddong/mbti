import { loveTest } from '../../../data/love';

Page({
  data: {
    score: 0,
    maxScore: loveTest.maxScore,
    resultTitle: '',
    resultDescriptionParagraphs: [],
    currentTestResultId: ''
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    const testResultId = options.testResultId;
    this.setData({
      currentTestResultId: testResultId || ''
    });
    const history = wx.getStorageSync('loveTestHistory') || [];
    let record = null;
    if (testResultId) {
      record = history.find(item => item.timestamp.toString() === testResultId) || null;
    } else {
      record = history.length > 0 ? history[0] : null;
    }

    if (!record) {
      const fallback = loveTest.results[0];
      this.setData({
        score: 0,
        resultTitle: fallback.title,
        resultDescriptionParagraphs: this.splitIntoParagraphs(fallback.description),
      });
      return;
    }

    this.setData({
      score: record.score,
      resultTitle: record.resultTitle,
      resultDescriptionParagraphs: this.splitIntoParagraphs(record.resultDescription),
      currentTestResultId: record.timestamp ? String(record.timestamp) : (testResultId || ''),
    });
  },

  onShareAppMessage() {
    const testResultId = this.data.currentTestResultId;
    const title = `我的恋爱脑指数：${this.data.score}/${this.data.maxScore}`;
    return {
      title,
      path: testResultId ? `/pages/love/result/index?testResultId=${testResultId}` : '/pages/love/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    const testResultId = this.data.currentTestResultId;
    const title = `恋爱脑指数：${this.data.score}/${this.data.maxScore}`;
    return {
      title,
      query: testResultId ? `testResultId=${testResultId}` : '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  shareTimelineTip() {
    wx.showToast({
      title: '点击右上角 ··· 分享到朋友圈',
      icon: 'none'
    });
  },

  splitIntoParagraphs(text) {
    if (!text) return [];
    const normalized = String(text).replace(/\s+/g, ' ').trim();
    if (!normalized) return [];
    const parts = [];
    let current = '';
    for (let i = 0; i < normalized.length; i++) {
      const ch = normalized[i];
      current += ch;
      if (ch === '。' || ch === '！' || ch === '？' || ch === '.' || ch === '!' || ch === '?') {
        const trimmed = current.trim();
        if (trimmed) parts.push(trimmed);
        current = '';
      }
    }
    const tail = current.trim();
    if (tail) parts.push(tail);
    return parts;
  },

  goHome() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  },

  takeTestAgain() {
    wx.navigateTo({
      url: '/pages/love/index'
    });
  }
});
