import { animalSuuTest, computeAnimalResult } from '../../data/animal';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: animalSuuTest.questions[0],
    totalQuestions: animalSuuTest.questions.length,
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
      title: '动物塑测试：你是哪种动物系气质？',
      path: '/pages/animal/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '动物塑测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = animalSuuTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: animalSuuTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === animalSuuTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const computed = computeAnimalResult(answers);
    const timestamp = Date.now();

    const history = wx.getStorageSync('animalSuuTestHistory') || [];
    history.unshift({
      timestamp,
      score: computed.score,
      resultTitle: computed.resultTitle,
      resultDescription: computed.resultDescription,
      secondaryLabel: computed.secondaryLabel || '',
    });
    wx.setStorageSync('animalSuuTestHistory', history);

    wx.navigateTo({
      url: `/pages/animal/result/index?testResultId=${timestamp}`
    });
  }
});
