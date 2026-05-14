import { fetchMbtiQuestions } from '../../services/appBackend';

const MBTI_DRAFT_KEY = 'mbtiQuizDraft';

function computeMbtiType(letters) {
  const c = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  letters.forEach((ch) => {
    if (Object.prototype.hasOwnProperty.call(c, ch)) c[ch] += 1;
  });
  const bit = (a, b) => (c[a] >= c[b] ? a : b);
  return `${bit('E', 'I')}${bit('S', 'N')}${bit('T', 'F')}${bit('J', 'P')}`;
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
    fetchMbtiQuestions()
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
      const pack = require('./mbti-questions.json');
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
    const draft = wx.getStorageSync(MBTI_DRAFT_KEY);
    if (draft && Number(draft.total) === total && Array.isArray(draft.answers) && draft.answers.length >= total) {
      try {
        wx.removeStorageSync(MBTI_DRAFT_KEY);
      } catch (e) {
        // ignore
      }
    }
    const draft2 = wx.getStorageSync(MBTI_DRAFT_KEY);
    const canResume =
      draft2 &&
      Number(draft2.total) === total &&
      Array.isArray(draft2.answers) &&
      draft2.answers.length > 0 &&
      draft2.answers.length < total;

    if (canResume) {
      wx.showModal({
        title: '继续答题',
        content: `检测到未完成的 MBTI 进度（已答 ${draft2.answers.length} / ${total} 题），是否从上次位置继续？`,
        confirmText: '继续',
        cancelText: '重新开始',
        success: (res) => {
          if (res.confirm) {
            this._answers = draft2.answers.map((x) => String(x || '').trim());
            this.renderAtIndex(total, this._answers.length);
          } else {
            wx.removeStorageSync(MBTI_DRAFT_KEY);
            this._answers = [];
            this.renderAtIndex(total, 0);
          }
        },
      });
      return;
    }

    if (draft2) {
      try {
        wx.removeStorageSync(MBTI_DRAFT_KEY);
      } catch (e) {
        // ignore
      }
    }
    this._answers = [];
    this.renderAtIndex(total, 0);
  },

  renderAtIndex(total, idx) {
    const safeIdx = Math.max(0, Math.min(idx, total - 1));
    const current = this._questions[safeIdx] || { question: '', answerOptions: [] };
    this.setData({
      loading: false,
      total,
      index: safeIdx,
      percent: total ? Math.round(((safeIdx + 1) / total) * 100) : 0,
      progressText: total ? `${safeIdx + 1} / ${total}` : '',
      current,
    });
  },

  saveMbtiDraft() {
    const total = this.data.total;
    if (!total || !Array.isArray(this._answers)) return;
    if (this._answers.length >= total) return;
    try {
      wx.setStorageSync(MBTI_DRAFT_KEY, {
        total,
        answers: [...this._answers],
        ts: Date.now(),
      });
    } catch (e) {
      // ignore
    }
  },

  onPickOption(e) {
    const letter = e.currentTarget.dataset.score;
    if (!letter || !this._questions.length) return;
    this._answers.push(String(letter).trim());
    const { index, total } = this.data;
    const next = index + 1;
    if (next >= total) {
      try {
        wx.removeStorageSync(MBTI_DRAFT_KEY);
      } catch (e) {
        // ignore
      }
      const type = computeMbtiType(this._answers);
      this.persistAndGoResult(type);
      return;
    }
    this.saveMbtiDraft();
    const current = this._questions[next];
    this.setData({
      index: next,
      current,
      percent: Math.round(((next + 1) / total) * 100),
      progressText: `${next + 1} / ${total}`,
    });
  },

  persistAndGoResult(type) {
    const timestamp = Date.now();
    let history = wx.getStorageSync('testHistory') || [];
    if (!Array.isArray(history)) history = [];
    history.unshift({ type, timestamp, title: 'MBTI' });
    wx.setStorageSync('testHistory', history.slice(0, 20));
    wx.redirectTo({
      url: `/pages/test/result/index?type=${encodeURIComponent(type)}&testResultId=${timestamp}`,
    });
  },
});
