import { fetchQuizQuestions } from '../../services/appBackend';

const ORDER = ['S', 'A', 'D', 'F'];

function tallyScores(letters) {
  const c = { S: 0, A: 0, D: 0, F: 0 };
  letters.forEach((L) => {
    const x = String(L || '').trim().toUpperCase();
    if (Object.prototype.hasOwnProperty.call(c, x)) c[x] += 1;
  });
  return c;
}

function primaryCode(letters) {
  const c = tallyScores(letters);
  const sorted = [...ORDER].sort((a, b) => {
    if (c[b] !== c[a]) return c[b] - c[a];
    return ORDER.indexOf(a) - ORDER.indexOf(b);
  });
  return sorted[0];
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
    fetchQuizQuestions('attachment')
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
      const pack = require('./attachment-questions.json');
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
    const x = String(letter).trim().toUpperCase();
    if (!['S', 'A', 'D', 'F'].includes(x)) return;
    this._answers.push(x);
    const { index, total } = this.data;
    const next = index + 1;
    if (next >= total) {
      const code = primaryCode(this._answers);
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
    let history = wx.getStorageSync('attachmentHistory') || [];
    if (!Array.isArray(history)) history = [];
    history.unshift({ code, timestamp: ts, title: '成人依恋' });
    wx.setStorageSync('attachmentHistory', history.slice(0, 20));
    wx.setStorageSync('attachmentLastResultView', { code, scores, ts });
    wx.redirectTo({ url: '/pages/attachment/result/index' });
  },
});
