import { fetchQuizConfig } from '../../services/quizBackend';
import { pickRangeResult, sumScoreAnswers } from '../../services/quizCompute';

const LOVE_DRAFT_KEY = 'loveQuizDraft';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: null,
    totalQuestions: 0,
    progress: 0,
    progressText: '0%',
    isLastQuestion: false,
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    wx.showLoading({ title: '加载中', mask: true });
    fetchQuizConfig('love')
      .then((cfg) => {
        const questions = cfg && Array.isArray(cfg.questions) ? cfg.questions : [];
        if (questions.length === 0) throw new Error('题库为空');
        this._quizConfig = cfg;
        wx.hideLoading();
        const total = questions.length;
        const draft = wx.getStorageSync(LOVE_DRAFT_KEY);
        const canResume =
          draft &&
          Number(draft.total) === total &&
          Array.isArray(draft.answers) &&
          typeof draft.currentQuestionIndex === 'number' &&
          draft.currentQuestionIndex > 0 &&
          draft.currentQuestionIndex < total;

        if (canResume) {
          wx.showModal({
            title: '继续答题',
            content: `检测到未完成的进度（第 ${draft.currentQuestionIndex + 1} / ${total} 题），是否继续？`,
            confirmText: '继续',
            cancelText: '重新开始',
            success: (res) => {
              if (res.confirm) {
                this.setQuestion(draft.currentQuestionIndex, draft.answers);
              } else {
                try {
                  wx.removeStorageSync(LOVE_DRAFT_KEY);
                } catch (e) {
                  // ignore
                }
                this.setQuestion(0, []);
              }
            },
          });
          return;
        }

        if (draft) {
          try {
            wx.removeStorageSync(LOVE_DRAFT_KEY);
          } catch (e) {
            // ignore
          }
        }
        this.setQuestion(0, []);
      })
      .catch((err) => {
        wx.hideLoading();
        wx.showToast({
          title: err && err.message ? err.message : '题库加载失败',
          icon: 'none'
        });
      });
  },

  onShareAppMessage() {
    return {
      title: '恋爱脑指数测试：测测你是不是恋爱脑',
      path: '/pages/love/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '恋爱脑指数测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const list = this._quizConfig && Array.isArray(this._quizConfig.questions) ? this._quizConfig.questions : [];
    const total = list.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: list[questionIndex],
      answers,
      selectedOptionIndex: typeof answers[questionIndex] === 'number' ? answers[questionIndex] : -1,
      totalQuestions: total,
      progress: percent,
      progressText: `${percent}%`,
      isLastQuestion: questionIndex === total - 1,
    });
  },

  selectOption(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (Number.isNaN(index)) return;
    this.setData({
      selectedOptionIndex: index
    });
  },

  previousQuestion() {
    if (this.data.currentQuestionIndex <= 0) return;
    this.setQuestion(this.data.currentQuestionIndex - 1, this.data.answers);
  },

  nextQuestion() {
    if (this.data.selectedOptionIndex < 0) return;

    const nextAnswers = [...this.data.answers];
    nextAnswers[this.data.currentQuestionIndex] = this.data.selectedOptionIndex;

    const total = this._quizConfig && Array.isArray(this._quizConfig.questions) ? this._quizConfig.questions.length : 0;
    if (this.data.currentQuestionIndex === total - 1) {
      try {
        wx.removeStorageSync(LOVE_DRAFT_KEY);
      } catch (e) {
        // ignore
      }
      this.finish(nextAnswers);
      return;
    }

    const nextIdx = this.data.currentQuestionIndex + 1;
    this.setQuestion(nextIdx, nextAnswers);
    try {
      wx.setStorageSync(LOVE_DRAFT_KEY, {
        total,
        answers: nextAnswers,
        currentQuestionIndex: nextIdx,
        ts: Date.now(),
      });
    } catch (e) {
      // ignore
    }
  },

  finish(answers) {
    try {
      wx.removeStorageSync(LOVE_DRAFT_KEY);
    } catch (e) {
      // ignore
    }
    const cfg = this._quizConfig || {};
    const score = sumScoreAnswers(cfg, answers);
    const result = pickRangeResult(cfg.results, score);
    const timestamp = Date.now();

    const history = wx.getStorageSync('loveTestHistory') || [];
    history.unshift({
      timestamp,
      score,
      resultTitle: result ? result.title : '',
      resultDescription: result ? result.description : '',
    });
    wx.setStorageSync('loveTestHistory', history);

    wx.navigateTo({
      url: `/pages/love/result/index?testResultId=${timestamp}`
    });
  }
});
