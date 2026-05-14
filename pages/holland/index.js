import { fetchQuizQuestions } from '../../services/appBackend';

const RIASEC = ['R', 'I', 'A', 'S', 'E', 'C'];

function tallyScores(letters) {
  const c = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  letters.forEach((L) => {
    const x = String(L || '').trim().toUpperCase();
    if (Object.prototype.hasOwnProperty.call(c, x)) c[x] += 1;
  });
  return c;
}

function computeHollandCode(letters) {
  const c = tallyScores(letters);
  const sorted = [...RIASEC].sort((a, b) => {
    if (c[b] !== c[a]) return c[b] - c[a];
    return RIASEC.indexOf(a) - RIASEC.indexOf(b);
  });
  return sorted.slice(0, 3).join('');
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
    this._answers = [];
    this._questions = [];
    this.loadQuestions();
  },

  loadQuestions() {
    fetchQuizQuestions('holland')
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
      const pack = require('./holland-questions.json');
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
    const letter = e.currentTarget.dataset.score;
    if (!letter || !this._questions.length) return;
    this._answers.push(String(letter).trim());
    const { index, total } = this.data;
    const next = index + 1;
    if (next >= total) {
      const code = computeHollandCode(this._answers);
      const scores = tallyScores(this._answers);
      this.persistAndGoResult(code, scores);
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

  persistAndGoResult(code, scores) {
    const ts = Date.now();
    let history = wx.getStorageSync('hollandHistory') || [];
    if (!Array.isArray(history)) history = [];
    history.unshift({ code, timestamp: ts, title: '霍兰德' });
    wx.setStorageSync('hollandHistory', history.slice(0, 20));
    wx.setStorageSync('hollandLastResultView', { code, scores, ts });
    wx.redirectTo({ url: '/pages/holland/result/index' });
  },
});
