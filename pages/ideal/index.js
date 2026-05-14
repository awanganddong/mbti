import { fetchQuizConfig } from '../../services/quizBackend';
import { tallyTypeAnswers } from '../../services/quizCompute';

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
    fetchQuizConfig('ideal')
      .then((cfg) => {
        const questions = cfg && Array.isArray(cfg.questions) ? cfg.questions : [];
        if (questions.length === 0) throw new Error('题库为空');
        this._quizConfig = cfg;
        wx.hideLoading();
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
      title: '理想恋人测试：你更吃哪一款？',
      path: '/pages/ideal/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '理想恋人测试',
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
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const cfg = this._quizConfig || {};
    const t = tallyTypeAnswers(cfg, answers);
    const meta = cfg.results ? cfg.results[t.bestType] : null;
    const secondaryLabel = (t.secondType && t.secondScore > 0 && cfg.typeLabels && cfg.typeLabels[t.secondType])
      ? `副选：${cfg.typeLabels[t.secondType]}（${t.secondScore} 分）`
      : '';
    const timestamp = Date.now();

    const history = wx.getStorageSync('idealPartnerTestHistory') || [];
    history.unshift({
      timestamp,
      score: t.bestScore,
      resultTitle: meta ? meta.title : '',
      resultDescription: meta ? meta.description : '',
      secondaryLabel,
    });
    wx.setStorageSync('idealPartnerTestHistory', history);

    wx.navigateTo({
      url: `/pages/ideal/result/index?testResultId=${timestamp}`
    });
  }
});
