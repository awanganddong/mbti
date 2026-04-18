import { nenTest } from '../../data/nen';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: nenTest.questions[0],
    totalQuestions: nenTest.questions.length,
    progress: 0,
    progressText: '0%',
    isLastQuestion: false,
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    this.setQuestion(0, []);
  },

  onShareAppMessage() {
    return {
      title: '年上年下倾向测试：你更吃哪一款？',
      path: '/pages/nen/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '年上年下倾向测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = nenTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: nenTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === nenTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const score = nenTest.questions.reduce((acc, q, idx) => {
      const optionIndex = answers[idx];
      if (typeof optionIndex !== 'number') return acc;
      const option = q.options[optionIndex];
      return acc + (option ? option.score : 0);
    }, 0);

    const result = nenTest.results.find(r => score >= r.min && score <= r.max) || nenTest.results[nenTest.results.length - 1];
    const timestamp = Date.now();

    const history = wx.getStorageSync('nenTestHistory') || [];
    history.unshift({
      timestamp,
      score,
      resultTitle: result.title,
      resultDescription: result.description,
    });
    wx.setStorageSync('nenTestHistory', history);

    wx.navigateTo({
      url: `/pages/nen/result/index?testResultId=${timestamp}`
    });
  }
});
