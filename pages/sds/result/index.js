import { sdsTest } from '../../../data/sds';

Page({
  data: {
    rawScore: 0,
    rawMax: sdsTest.rawMax,
    standardScore: 0,
    standardMax: sdsTest.standardMax,
    resultTitle: '',
    resultDescriptionParagraphs: [],
    disclaimerText: sdsTest.disclaimer,
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
    const history = wx.getStorageSync('sdsTestHistory') || [];
    let record = null;
    if (testResultId) {
      record = history.find(item => item.timestamp.toString() === testResultId) || null;
    } else {
      record = history.length > 0 ? history[0] : null;
    }

    if (!record) {
      this.setData({
        rawScore: 0,
        standardScore: 0,
        resultTitle: '暂无测评记录',
        resultDescriptionParagraphs: ['请先完成 SDS 抑郁自评量表。'],
      });
      return;
    }

    this.setData({
      rawScore: record.rawScore,
      standardScore: record.standardScore,
      resultTitle: record.resultTitle,
      resultDescriptionParagraphs: this.splitIntoParagraphs(record.resultDescription),
      currentTestResultId: record.timestamp ? String(record.timestamp) : (testResultId || ''),
    });
  },

  onShareAppMessage() {
    const testResultId = this.data.currentTestResultId;
    const title = `SDS 抑郁自评：标准分（抑郁指数）${this.data.standardScore}（仅供参考）`;
    return {
      title,
      path: testResultId ? `/pages/sds/result/index?testResultId=${testResultId}` : '/pages/sds/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    const testResultId = this.data.currentTestResultId;
    const title = `SDS 标准分 ${this.data.standardScore}（仅供参考）`;
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
      url: '/pages/sds/index'
    });
  }
});
