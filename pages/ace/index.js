import { aceTest, computeAceScore } from '../../data/ace';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: aceTest.questions[0],
    totalQuestions: aceTest.questions.length,
    progress: 0,
    progressText: '0%',
    isLastQuestion: false,
    instruction: aceTest.instruction,
    optionLabels: aceTest.optionLabels,
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
      title: '无性恋性取向自测（专业参考）',
      path: '/pages/ace/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '无性恋性取向自测',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = aceTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: aceTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === aceTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const score = computeAceScore(answers);
    const result = aceTest.results.find((r) => score >= r.min && score <= r.max) || aceTest.results[aceTest.results.length - 1];
    const timestamp = Date.now();

    const history = wx.getStorageSync('aceOrientationTestHistory') || [];
    history.unshift({
      timestamp,
      score,
      resultTitle: result.title,
      resultDescription: result.description,
    });
    wx.setStorageSync('aceOrientationTestHistory', history);

    wx.navigateTo({
      url: `/pages/ace/result/index?testResultId=${timestamp}`
    });
  }
});
