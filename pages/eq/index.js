import { fetchQuizQuestions } from '../../services/appBackend';

function resolveTier(total, maxScore) {
  const r = maxScore > 0 ? total / maxScore : 0;
  if (r >= 0.8) {
    return {
      label: '情商表现优秀',
      desc: '你在情绪觉察、共情与沟通上整体较成熟。继续保持倾听与表达边界的好习惯。',
    };
  }
  if (r >= 0.63) {
    return {
      label: '情商良好',
      desc: '多数情境下能稳住情绪并顾及他人。可在高压或冲突场景多练习「先复述感受，再谈事实」。',
    };
  }
  if (r >= 0.45) {
    return {
      label: '情商中等',
      desc: '有成长空间。建议从小处练习：命名自己的情绪、延迟回应、用「我」开头表达需求。',
    };
  }
  return {
    label: '仍有提升空间',
    desc: '结果仅作趣味参考。可通过阅读、练习正念或与信任的人复盘互动来逐步提升情绪智力。',
  };
}

Page({
  data: {
    loading: true,
    total: 0,
    index: 0,
    percent: 0,
    progressText: '',
    current: { question: '', answerOptions: [] },
  },

  onLoad() {
    this._scores = [];
    this._questions = [];
    this.loadQuestions();
  },

  loadQuestions() {
    fetchQuizQuestions('eq')
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          this.applyQuestions(list);
          return;
        }
        this.applyLocalQuestions();
      })
      .catch(() => {
        this.applyLocalQuestions();
      });
  },

  applyLocalQuestions() {
    try {
      const pack = require('./eq-questions.json');
      const list = pack && Array.isArray(pack.questions) ? pack.questions : [];
      if (list.length > 0) {
        this.applyQuestions(list);
        return;
      }
    } catch (e) {
      // ignore
    }
    this.setData({ loading: false });
    wx.showToast({ title: '题库加载失败', icon: 'none' });
  },

  applyQuestions(list) {
    this._questions = list;
    const total = list.length;
    const current = list[0] || { question: '', answerOptions: [] };
    this.setData({
      loading: false,
      total,
      index: 0,
      percent: total ? Math.round((1 / total) * 100) : 0,
      progressText: total ? `1 / ${total}` : '',
      current,
    });
  },

  onPickOption(e) {
    const raw = e.currentTarget.dataset.score;
    const n = parseInt(String(raw || '0'), 10);
    if (!this._questions.length || Number.isNaN(n) || n < 1 || n > 4) return;
    this._scores.push(n);
    const { index, total } = this.data;
    const next = index + 1;
    if (next >= total) {
      const totalScore = this._scores.reduce((a, b) => a + b, 0);
      const maxScore = total * 4;
      const tier = resolveTier(totalScore, maxScore);
      this.persistAndGoResult({ totalScore, maxScore, tier });
      return;
    }
    const current = this._questions[next];
    this.setData({
      index: next,
      current,
      percent: Math.round(((next + 1) / total) * 100),
      progressText: `${next + 1} / ${total}`,
    });
  },

  persistAndGoResult({ totalScore, maxScore, tier }) {
    const ts = Date.now();
    let history = wx.getStorageSync('eqHistory') || [];
    if (!Array.isArray(history)) history = [];
    history.unshift({
      totalScore,
      maxScore,
      label: tier.label,
      timestamp: ts,
      title: '情商测试',
    });
    wx.setStorageSync('eqHistory', history.slice(0, 20));
    wx.setStorageSync('eqLastResultView', {
      totalScore,
      maxScore,
      tierLabel: tier.label,
      tierDesc: tier.desc,
      ts,
    });
    wx.redirectTo({ url: '/pages/eq/result/index' });
  },
});
