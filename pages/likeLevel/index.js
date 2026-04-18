import { likeLevelTest } from '../../data/likeLevel';

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: likeLevelTest.questions[0],
    totalQuestions: likeLevelTest.questions.length,
    progress: 0,
    progressText: '0%',
    isLastQuestion: false,
    instruction: likeLevelTest.instruction,
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
      title: '喜欢程度测试：你对 TA 有多喜欢？',
      path: '/pages/likeLevel/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '喜欢程度测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = likeLevelTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: likeLevelTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === likeLevelTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const score = likeLevelTest.questions.reduce((acc, q, idx) => {
      const optionIndex = answers[idx];
      if (typeof optionIndex !== 'number') return acc;
      const option = q.options[optionIndex];
      return acc + (option ? option.score : 0);
    }, 0);

    const result = likeLevelTest.results.find(r => score >= r.min && score <= r.max) || likeLevelTest.results[likeLevelTest.results.length - 1];
    const timestamp = Date.now();

    const history = wx.getStorageSync('likeLevelTestHistory') || [];
    history.unshift({
      timestamp,
      score,
      resultTitle: result.title,
      resultDescription: result.description,
    });
    wx.setStorageSync('likeLevelTestHistory', history);

    wx.navigateTo({
      url: `/pages/likeLevel/result/index?testResultId=${timestamp}`
    });
  }
});
