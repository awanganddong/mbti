import { fetchTarotDeck } from '../../../services/appBackend';

Page({
  data: {
    cardTitle: '',
    orientation: '',
    keywords: '',
    question: '',
    sections: [],
    meaningParagraphs: [],
    currentDrawId: '',
    aiLoading: false,
    aiError: '',
    aiSections: [],
    aiModel: '',
    showAiOnly: false,
    aiLoadingTip: ''
  },

  onUnload() {
    this.stopAiLoadingTicker();
  },

  startAiLoadingTicker() {
    this.stopAiLoadingTicker();
    const tips = [
      '我在帮你把话说得更清楚一点…',
      '稍等，我在把重点挑出来…',
      '马上好，先别急着下结论…',
      '快好了，我在整理更可执行的建议…'
    ];
    let idx = 0;
    this.setData({
      aiLoadingTip: tips[0]
    });
    this._aiLoadingTimer = setInterval(() => {
      idx = (idx + 1) % tips.length;
      this.setData({
        aiLoadingTip: tips[idx]
      });
    }, 1200);
  },

  stopAiLoadingTicker() {
    if (this._aiLoadingTimer) {
      clearInterval(this._aiLoadingTimer);
      this._aiLoadingTimer = null;
    }
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });

    const drawId = options.drawId;
    this.setData({
      currentDrawId: drawId || ''
    });

    const history = wx.getStorageSync('tarotHistory') || [];
    let record = null;
    if (drawId) {
      record = history.find(item => item.timestamp.toString() === drawId) || null;
    } else {
      record = history.length > 0 ? history[0] : null;
    }

    if (!record) {
      this.setData({
        cardTitle: '塔罗牌',
        orientation: '正位',
        keywords: '',
        question: '',
        sections: [],
        meaningParagraphs: [],
      });

      fetchTarotDeck()
        .then((deck) => {
          const fallback = Array.isArray(deck) && deck.length > 0 ? deck[0] : null;
          if (!fallback) return;
          this.setData({
            cardTitle: fallback.title || '塔罗牌',
            keywords: fallback.keywords || '',
            meaningParagraphs: this.splitIntoParagraphs(fallback.upright || ''),
          });
        })
        .catch(() => {});
      return;
    }

    const sections = Array.isArray(record.sections) ? record.sections : [];
    this.setData({
      cardTitle: record.cardTitle || '',
      orientation: record.orientation || '',
      keywords: record.keywords || '',
      question: record.question || '',
      sections,
      meaningParagraphs: sections.length > 0 ? [] : this.splitIntoParagraphs(record.meaning || ''),
      currentDrawId: record.timestamp ? String(record.timestamp) : (drawId || ''),
    });

    const currentId = record.timestamp ? String(record.timestamp) : (drawId || '');
    if (currentId) {
      const cacheKey = `tarotAi:${currentId}`;
      const cached = wx.getStorageSync(cacheKey);
      if (cached && Array.isArray(cached.sections) && cached.sections.length > 0) {
        this.setData({
          aiSections: cached.sections,
          aiModel: cached.model || ''
        });
      }
    }

    if (options && options.ai === '1') {
      this.setData({
        showAiOnly: true
      });
      this.fetchAiInterpretation();
    }
  },

  fetchAiInterpretation() {
    if (this.data.aiLoading) return;
    const question = String(this.data.question || '').trim();
    if (!question) {
      wx.showToast({
        title: '请先在塔罗页输入问题',
        icon: 'none'
      });
      return;
    }

    const app = getApp();
    const baseUrl = app && app.globalData ? app.globalData.apiBaseUrl : '';
    if (!baseUrl) {
      wx.showToast({
        title: '未配置后端地址',
        icon: 'none'
      });
      return;
    }

    const drawId = this.data.currentDrawId;
    this.setData({
      aiLoading: true,
      aiError: '',
      showAiOnly: true
    });

    this.startAiLoadingTicker();

    const uid = Number(wx.getStorageSync('tarotUid') || 0);

    wx.request({
      url: `${baseUrl}/tarot/interpret`,
      method: 'POST',
      timeout: 45000,
      header: {
        'content-type': 'application/json'
      },
      data: {
        uid: uid > 0 ? uid : undefined,
        question,
        cardTitle: this.data.cardTitle,
        orientation: this.data.orientation,
        keywords: this.data.keywords,
        baseSections: Array.isArray(this.data.sections) ? this.data.sections : []
      },
      success: (res) => {
        const payload = res && res.data ? res.data : null;
        if (!payload || payload.code !== 200) {
          this.stopAiLoadingTicker();
          this.setData({
            aiLoading: false,
            aiError: (payload && payload.msg) ? payload.msg : 'AI 解读失败'
          });
          return;
        }

        const data = payload.data || {};
        const sections = Array.isArray(data.sections) ? data.sections : [];
        if (sections.length === 0) {
          this.stopAiLoadingTicker();
          this.setData({
            aiLoading: false,
            aiError: 'AI 未返回有效内容'
          });
          return;
        }

        this.stopAiLoadingTicker();
        this.setData({
          aiLoading: false,
          aiSections: sections,
          aiModel: data.model || ''
        });

        if (drawId) {
          wx.setStorageSync(`tarotAi:${drawId}`, {
            sections,
            model: data.model || '',
            timestamp: Date.now()
          });
        }
      },
      fail: () => {
        this.stopAiLoadingTicker();
        this.setData({
          aiLoading: false,
          aiError: '网络请求失败'
        });
      }
    });
  },

  onShareAppMessage() {
    const drawId = this.data.currentDrawId;
    const title = `我的塔罗牌：${this.data.cardTitle}（${this.data.orientation}）`;
    return {
      title,
      path: drawId ? `/pages/tarot/result/index?drawId=${drawId}` : '/pages/tarot/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    const drawId = this.data.currentDrawId;
    const title = `塔罗牌：${this.data.cardTitle}（${this.data.orientation}）`;
    return {
      title,
      query: drawId ? `drawId=${drawId}` : '',
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
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  drawAgain() {
    wx.redirectTo({
      url: '/pages/tarot/index'
    });
  }
});
