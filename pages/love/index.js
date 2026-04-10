import { loveTest } from '../../data/love';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: loveTest.questions[0],
    totalQuestions: loveTest.questions.length,
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
    const total = loveTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: loveTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === loveTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const score = loveTest.questions.reduce((acc, q, idx) => {
      const optionIndex = answers[idx];
      if (typeof optionIndex !== 'number') return acc;
      const option = q.options[optionIndex];
      return acc + (option ? option.score : 0);
    }, 0);

    const result = loveTest.results.find(r => score >= r.min && score <= r.max) || loveTest.results[loveTest.results.length - 1];
    const timestamp = Date.now();

    const history = wx.getStorageSync('loveTestHistory') || [];
    history.unshift({
      timestamp,
      score,
      resultTitle: result.title,
      resultDescription: result.description,
    });
    wx.setStorageSync('loveTestHistory', history);

    wx.navigateTo({
      url: `/pages/love/result/index?testResultId=${timestamp}`
    });
  }
});
