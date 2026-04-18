import { sdsTest, computeSdsScores } from '../../data/sds';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: sdsTest.questions[0],
    totalQuestions: sdsTest.questions.length,
    progress: 0,
    progressText: '0%',
    isLastQuestion: false,
    instruction: sdsTest.instruction,
    optionLabels: sdsTest.optionLabels,
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
      title: 'SDS 抑郁自评量表（20题）',
      path: '/pages/sds/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: 'SDS 抑郁自评量表',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = sdsTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: sdsTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === sdsTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const { raw, standardInt, result } = computeSdsScores(answers);
    const timestamp = Date.now();

    const history = wx.getStorageSync('sdsTestHistory') || [];
    history.unshift({
      timestamp,
      rawScore: raw,
      standardScore: standardInt,
      resultTitle: result.title,
      resultDescription: result.description,
    });
    wx.setStorageSync('sdsTestHistory', history);

    wx.navigateTo({
      url: `/pages/sds/result/index?testResultId=${timestamp}`
    });
  }
});
