import { jung8Test, computeJung8Result } from '../../data/jung8';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: jung8Test.questions[0],
    totalQuestions: jung8Test.questions.length,
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
      title: '荣格八维人格测试：看看你的认知功能倾向',
      path: '/pages/jung8/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '荣格八维人格测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = jung8Test.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: jung8Test.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === jung8Test.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const computed = computeJung8Result(answers);
    const timestamp = Date.now();

    const history = wx.getStorageSync('jung8TestHistory') || [];
    history.unshift({
      timestamp,
      sortedScores: computed.sortedScores,
      topTwoLabel: computed.topTwoLabel,
      typeGuess: computed.typeGuess || '',
      resultTitle: computed.resultTitle,
      resultDescription: computed.resultDescription,
    });
    wx.setStorageSync('jung8TestHistory', history);

    wx.navigateTo({
      url: `/pages/jung8/result/index?testResultId=${timestamp}`
    });
  }
});
