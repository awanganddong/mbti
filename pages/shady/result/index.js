import { shadyTest } from '../../../data/shady';

Page({
  data: {
    score: 0,
    maxScore: shadyTest.max_score,
    resultTitle: '',
    resultDescriptionParagraphs: [],
    traits: [],
    analysisParagraphs: [],
    suggestions: [],
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

    const history = wx.getStorageSync('shadyTestHistory') || [];
    let record = null;
    if (testResultId) {
      record = history.find(item => item.timestamp.toString() === testResultId) || null;
    } else {
      record = history.length > 0 ? history[0] : null;
    }

    if (!record) {
      const fallback = shadyTest.results[0];
      this.setData({
        score: 0,
        resultTitle: fallback.title,
        resultDescriptionParagraphs: this.splitIntoParagraphs(fallback.description),
        traits: fallback.traits || [],
        analysisParagraphs: this.splitIntoParagraphs(fallback.analysis || ''),
        suggestions: fallback.suggestions || [],
      });
      return;
    }

    const result = record.result || {};
    this.setData({
      score: record.score || 0,
      resultTitle: result.title || '',
      resultDescriptionParagraphs: this.splitIntoParagraphs(result.description || ''),
      traits: result.traits || [],
      analysisParagraphs: this.splitIntoParagraphs(result.analysis || ''),
      suggestions: result.suggestions || [],
      currentTestResultId: record.timestamp ? String(record.timestamp) : (testResultId || ''),
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

  onShareAppMessage() {
    const testResultId = this.data.currentTestResultId;
    const title = `我的暧昧指数：${this.data.score}/${this.data.maxScore}`;
    return {
      title,
      path: testResultId ? `/pages/shady/result/index?testResultId=${testResultId}` : '/pages/shady/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    const testResultId = this.data.currentTestResultId;
    const title = `暧昧指数：${this.data.score}/${this.data.maxScore}`;
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

  goHome() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  },

  takeTestAgain() {
    wx.navigateTo({
      url: '/pages/shady/index'
    });
  }
});
