import { fetchQuizConfig } from '../../../services/quizBackend';

Page({
  data: {
    score: 0,
    maxScore: 0,
    resultTitle: '',
    resultDescriptionParagraphs: [],
    secondaryLabel: '',
    disclaimerText: '',
    currentTestResultId: '',
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
    fetchQuizConfig('breakup')
      .then((cfg) => {
        const maxScore = Number(cfg.maxScore || cfg.max_score || 0);
        this.setData({
          maxScore,
          disclaimerText: cfg.disclaimer || '',
        });

        const history = wx.getStorageSync('breakupReasonTestHistory') || [];
        let record = null;
        if (testResultId) {
          record = history.find(item => item.timestamp.toString() === testResultId) || null;
        } else {
          record = history.length > 0 ? history[0] : null;
        }

        if (!record) {
          const results = cfg && cfg.results && typeof cfg.results === 'object' ? cfg.results : null;
          const firstKey = results ? Object.keys(results)[0] : '';
          const fallback = results ? (results.comm || results[firstKey]) : null;
          this.setData({
            score: 0,
            resultTitle: fallback ? fallback.title : '',
            resultDescriptionParagraphs: this.splitIntoParagraphs(fallback ? fallback.description : ''),
            secondaryLabel: '',
          });
          return;
        }

        this.setData({
          score: record.score,
          resultTitle: record.resultTitle,
          resultDescriptionParagraphs: this.splitIntoParagraphs(record.resultDescription),
          secondaryLabel: record.secondaryLabel || '',
          currentTestResultId: record.timestamp ? String(record.timestamp) : (testResultId || ''),
        });
      })
      .catch(() => {
        const history = wx.getStorageSync('breakupReasonTestHistory') || [];
        const record = history.length > 0 ? history[0] : null;
        if (record) {
          this.setData({
            score: record.score,
            resultTitle: record.resultTitle,
            resultDescriptionParagraphs: this.splitIntoParagraphs(record.resultDescription),
            secondaryLabel: record.secondaryLabel || '',
          });
        }
      });
  },

  onShareAppMessage() {
    const testResultId = this.data.currentTestResultId;
    const title = `分手原因倾向：${this.data.resultTitle}（${this.data.score}/${this.data.maxScore}）`;
    return {
      title,
      path: testResultId ? `/pages/breakup/result/index?testResultId=${testResultId}` : '/pages/breakup/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    const testResultId = this.data.currentTestResultId;
    const title = `分手原因倾向 ${this.data.resultTitle} ${this.data.score}/${this.data.maxScore}`;
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
      url: '/pages/breakup/index'
    });
  }
});
