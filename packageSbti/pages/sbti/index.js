import { questions, specialQuestions } from "../../../data/sbti-official-data";
import { computeOfficialSbti, sbtiShareImageUrl } from "../../../data/sbti";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQueue(shuffledRegular, insertIndex, answers) {
  let queue = [
    ...shuffledRegular.slice(0, insertIndex),
    specialQuestions[0],
    ...shuffledRegular.slice(insertIndex),
  ];
  const gateIdx = queue.findIndex((q) => q.id === "drink_gate_q1");
  if (gateIdx !== -1 && answers["drink_gate_q1"] === 3) {
    queue = [...queue.slice(0, gateIdx + 1), specialQuestions[1], ...queue.slice(gateIdx + 1)];
  }
  return queue;
}

Page({
  data: {
    currentQuestionIndex: 0,
    selectedOptionIndex: -1,
    answers: {},
    questionQueue: [],
    currentQuestion: null,
    totalQuestions: 0,
    progress: 0,
    progressText: "0 / 0",
    isLastQuestion: false,
  },

  _shuffledRegular: [],
  _insertIndex: 0,

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    this.initTest();
  },

  initTest() {
    const shuffledRegular = shuffle(questions);
    const insertIndex = Math.floor(Math.random() * shuffledRegular.length) + 1;
    this._shuffledRegular = shuffledRegular;
    this._insertIndex = insertIndex;
    this.setData({ answers: {} }, () => this.applyQueue(0));
  },

  applyQueue(currentIndex) {
    const answers = this.data.answers || {};
    const queue = buildQueue(this._shuffledRegular, this._insertIndex, answers);
    const idx = Math.max(0, Math.min(currentIndex, queue.length - 1));
    const q = queue[idx];
    const selectedVal = answers[q.id];
    const optIdx = q.options.findIndex((o) => o.value === selectedVal);
    const total = queue.length;
    const percent = total <= 1 ? 100 : Math.round((idx / (total - 1)) * 100);
    this.setData({
      questionQueue: queue,
      currentQuestionIndex: idx,
      currentQuestion: q,
      totalQuestions: total,
      selectedOptionIndex: optIdx >= 0 ? optIdx : -1,
      progress: percent,
      progressText: `${idx + 1} / ${total}`,
      isLastQuestion: idx === total - 1,
    });
  },

  onShareAppMessage() {
    return {
      title: "SBTI 人格测试：十五维原版算法",
      path: "/packageSbti/pages/sbti/index",
      imageUrl: sbtiShareImageUrl,
    };
  },

  onShareTimeline() {
    return {
      title: "SBTI 人格测试",
      query: "",
      imageUrl: sbtiShareImageUrl,
    };
  },

  selectOption(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (Number.isNaN(index)) return;
    this.setData({
      selectedOptionIndex: index,
    });
  },

  previousQuestion() {
    if (this.data.currentQuestionIndex <= 0) return;
    this.applyQueue(this.data.currentQuestionIndex - 1);
  },

  nextQuestion() {
    if (this.data.selectedOptionIndex < 0) return;
    const { questionQueue, currentQuestionIndex } = this.data;
    const q = questionQueue[currentQuestionIndex];
    const val = q.options[this.data.selectedOptionIndex].value;
    let answers = { ...this.data.answers, [q.id]: val };
    if (q.id === "drink_gate_q1" && val !== 3) {
      delete answers.drink_gate_q2;
    }

    const newQueue = buildQueue(this._shuffledRegular, this._insertIndex, answers);
    this.setData({ answers }, () => {
      if (currentQuestionIndex >= newQueue.length - 1) {
        this.finish(answers);
        return;
      }
      this.applyQueue(currentQuestionIndex + 1);
    });
  },

  finish(answers) {
    const officialResult = computeOfficialSbti(answers);
    const timestamp = Date.now();
    const history = wx.getStorageSync("sbtiTestHistory") || [];
    history.unshift({
      timestamp,
      answers,
      officialResult,
    });
    wx.setStorageSync("sbtiTestHistory", history);

    wx.navigateTo({
      url: `/packageSbti/pages/sbti/result/index?testResultId=${timestamp}`,
    });
  },
});
