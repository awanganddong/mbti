import { plantSuuTest, computePlantResult } from '../../data/plant';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: plantSuuTest.questions[0],
    totalQuestions: plantSuuTest.questions.length,
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
      title: '植物塑测试：你是哪种植物系气质？',
      path: '/pages/plant/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '植物塑测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = plantSuuTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: plantSuuTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === plantSuuTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const computed = computePlantResult(answers);
    const timestamp = Date.now();

    const history = wx.getStorageSync('plantSuuTestHistory') || [];
    history.unshift({
      timestamp,
      score: computed.score,
      resultTitle: computed.resultTitle,
      resultDescription: computed.resultDescription,
      secondaryLabel: computed.secondaryLabel || '',
    });
    wx.setStorageSync('plantSuuTestHistory', history);

    wx.navigateTo({
      url: `/pages/plant/result/index?testResultId=${timestamp}`
    });
  }
});
