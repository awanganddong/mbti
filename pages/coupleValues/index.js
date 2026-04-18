import { coupleValuesTest } from '../../data/coupleValues';

const STORAGE_SELF = 'coupleValuesAnswersSelf';
const STORAGE_PARTNER = 'coupleValuesAnswersPartner';

Page({
  data: {
    round: 'self',
    roundTitle: '第一份：我自己',
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: [],
    currentQuestion: coupleValuesTest.questions[0],
    totalQuestions: coupleValuesTest.questions.length,
    progress: 0,
    progressText: '0%',
    isLastQuestion: false,
    instruction: coupleValuesTest.instruction,
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    const isPartner = options.round === 'partner';
    if (isPartner) {
      const selfDone = wx.getStorageSync(STORAGE_SELF);
      if (!selfDone || !Array.isArray(selfDone) || selfDone.length !== coupleValuesTest.questions.length) {
        wx.showModal({
          title: '提示',
          content: '请先在同一台手机上完成「第一份：我自己」，再让另一半答第二份。',
          showCancel: false,
          success: () => {
            wx.redirectTo({ url: '/pages/coupleValues/index' });
          }
        });
        return;
      }
    }
    this.setData({
      round: isPartner ? 'partner' : 'self',
      roundTitle: isPartner ? '第二份：我的另一半' : '第一份：我自己',
    });
    this.setQuestion(0, []);
  },

  onShareAppMessage() {
    return {
      title: '情侣三观匹配测试：五维画像与匹配度',
      path: '/pages/coupleValues/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '情侣三观匹配测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  setQuestion(questionIndex, answers) {
    const total = coupleValuesTest.questions.length;
    const percent = total <= 1 ? 100 : Math.round((questionIndex / (total - 1)) * 100);
    this.setData({
      currentQuestionIndex: questionIndex,
      currentQuestion: coupleValuesTest.questions[questionIndex],
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

    if (this.data.currentQuestionIndex === coupleValuesTest.questions.length - 1) {
      this.finish(nextAnswers);
      return;
    }

    this.setQuestion(this.data.currentQuestionIndex + 1, nextAnswers);
  },

  finish(answers) {
    const { round } = this.data;
    if (round === 'self') {
      wx.setStorageSync(STORAGE_SELF, answers);
      wx.redirectTo({
        url: '/pages/coupleValues/result/index?mode=self'
      });
      return;
    }
    wx.setStorageSync(STORAGE_PARTNER, answers);
    wx.redirectTo({
      url: '/pages/coupleValues/result/index?mode=match'
    });
  }
});
