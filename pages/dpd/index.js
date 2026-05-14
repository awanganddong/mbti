import { fetchQuizQuestions } from '../../services/appBackend';

function resolveTier(total, maxScore) {
  const r = maxScore > 0 ? total / maxScore : 0;
  if (r < 0.34) {
    return {
      label: '筛查倾向：较低',
      desc: "在依附、独处困难与决策依赖相关条目上得分整体偏低。15 题仅为粗筛，不构成依赖型人格障碍或任何精神障碍诊断。",
    };
  }
  if (r < 0.62) {
    return {
      label: '筛查倾向：中等',
      desc: "你可能在亲密关系或压力情境下更想有人陪伴或给意见。若依赖已影响独立生活或自我边界，建议与心理咨询师讨论；本结果不能替代专业评估。",
    };
  }
  return {
    label: '筛查倾向：偏高',
    desc: "条目提示在「害怕被抛弃、难以独自决定、强烈需要他人肯定」等维度上体验较明显。这不等于人格障碍诊断；若伴随显著痛苦或功能受损，请寻求专业评估。",
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
    fetchQuizQuestions("dpd")
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
      const pack = require('./dpd-questions.json');
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
    if (!this._questions.length || Number.isNaN(n) || n < 0 || n > 3) return;
    this._scores.push(n);
    const { index, total } = this.data;
    const next = index + 1;
    if (next >= total) {
      const totalScore = this._scores.reduce((a, b) => a + b, 0);
      const maxScore = total * 3;
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
    let history = wx.getStorageSync("dpdHistory") || [];
    if (!Array.isArray(history)) history = [];
    history.unshift({
      totalScore,
      maxScore,
      label: tier.label,
      timestamp: ts,
      title: "依赖倾向筛查",
    });
    wx.setStorageSync("dpdHistory", history.slice(0, 20));
    wx.setStorageSync("dpdLastResultView", {
      totalScore,
      maxScore,
      tierLabel: tier.label,
      tierDesc: tier.desc,
      ts,
    });
    wx.redirectTo({ url: "/pages/dpd/result/index" });
  },
});
