import { fetchQuizConfig } from "../../../services/quizBackend";
import { computeOfficialSbti } from "../../../services/sbtiCompute";
import { sbtiShareImageUrl } from "../../../services/sbtiImages";

const SBTI_DRAFT_KEY = "sbtiQuizDraft";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQueue(shuffledRegular, insertIndex, answers, specialQuestions) {
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
  _regularQuestions: [],
  _specialQuestions: [],

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    wx.showLoading({ title: "加载中", mask: true });
    fetchQuizConfig("sbti")
      .then((cfg) => {
        const qs = cfg && Array.isArray(cfg.questions) ? cfg.questions : [];
        const sqs = cfg && Array.isArray(cfg.specialQuestions) ? cfg.specialQuestions : [];
        if (qs.length === 0 || sqs.length === 0) throw new Error("题库为空");
        wx.hideLoading();
        this._quizConfig = cfg;
        this._regularQuestions = qs;
        this._specialQuestions = sqs;
        this.maybeResumeOrStart();
      })
      .catch((err) => {
        wx.hideLoading();
        wx.showToast({
          title: err && err.message ? err.message : "题库加载失败",
          icon: "none",
        });
      });
  },

  isRestorableDraft(draft, qs) {
    if (!draft || draft.v !== 1 || !Array.isArray(draft.orderedIds)) return false;
    if (draft.orderedIds.length !== qs.length) return false;
    const set = new Set(qs.map((q) => q.id));
    for (let i = 0; i < draft.orderedIds.length; i++) {
      if (!set.has(draft.orderedIds[i])) return false;
    }
    const ins = Number(draft.insertIndex);
    if (!Number.isFinite(ins) || ins < 1 || ins > draft.orderedIds.length) return false;
    const ci = Number(draft.currentQuestionIndex);
    if (!Number.isFinite(ci) || ci < 0) return false;
    if (!draft.answers || typeof draft.answers !== "object") return false;
    return true;
  },

  tryRestoreDraft(draft, qs) {
    const byId = {};
    qs.forEach((q) => {
      byId[q.id] = q;
    });
    const ordered = draft.orderedIds.map((id) => byId[id]).filter(Boolean);
    if (ordered.length !== qs.length) return false;
    this._shuffledRegular = ordered;
    this._insertIndex = Number(draft.insertIndex);
    const answers = { ...(draft.answers || {}) };
    this.setData({ answers }, () => {
      const tempQueue = buildQueue(
        this._shuffledRegular,
        this._insertIndex,
        answers,
        this._specialQuestions || [],
      );
      let ci = Math.max(0, Number(draft.currentQuestionIndex) || 0);
      if (tempQueue.length > 0 && ci >= tempQueue.length) {
        ci = tempQueue.length - 1;
      }
      this.applyQueue(ci);
    });
    return true;
  },

  maybeResumeOrStart() {
    const qs = this._regularQuestions || [];
    const draft = wx.getStorageSync(SBTI_DRAFT_KEY);
    if (this.isRestorableDraft(draft, qs)) {
      wx.showModal({
        title: "继续答题",
        content: "检测到未完成的 SBTI 进度，是否从上次位置继续？",
        confirmText: "继续",
        cancelText: "重新开始",
        success: (res) => {
          if (res.confirm) {
            const ok = this.tryRestoreDraft(draft, qs);
            if (!ok) {
              try {
                wx.removeStorageSync(SBTI_DRAFT_KEY);
              } catch (e) {
                // ignore
              }
              this.initTest();
            }
          } else {
            try {
              wx.removeStorageSync(SBTI_DRAFT_KEY);
            } catch (e) {
              // ignore
            }
            this.initTest();
          }
        },
      });
      return;
    }
    if (draft) {
      try {
        wx.removeStorageSync(SBTI_DRAFT_KEY);
      } catch (e) {
        // ignore
      }
    }
    this.initTest();
  },

  initTest() {
    const shuffledRegular = shuffle(this._regularQuestions || []);
    const insertIndex = Math.floor(Math.random() * shuffledRegular.length) + 1;
    this._shuffledRegular = shuffledRegular;
    this._insertIndex = insertIndex;
    this.setData({ answers: {} }, () => this.applyQueue(0));
  },

  persistSbtiDraft(idx, answers) {
    const orderedIds = (this._shuffledRegular || []).map((q) => q && q.id).filter(Boolean);
    if (!orderedIds.length) return;
    const keys = Object.keys(answers || {});
    if (keys.length === 0 && idx <= 0) return;
    try {
      wx.setStorageSync(SBTI_DRAFT_KEY, {
        v: 1,
        orderedIds,
        insertIndex: this._insertIndex,
        answers: { ...(answers || {}) },
        currentQuestionIndex: idx,
        ts: Date.now(),
      });
    } catch (e) {
      // ignore
    }
  },

  applyQueue(currentIndex) {
    const answers = this.data.answers || {};
    const queue = buildQueue(this._shuffledRegular, this._insertIndex, answers, this._specialQuestions || []);
    const idx = Math.max(0, Math.min(currentIndex, queue.length - 1));
    const q = queue[idx];
    const selectedVal = answers[q.id];
    const optIdx = q.options.findIndex((o) => o.value === selectedVal);
    const total = queue.length;
    const percent = total <= 1 ? 100 : Math.round((idx / (total - 1)) * 100);
    this.setData(
      {
        questionQueue: queue,
        currentQuestionIndex: idx,
        currentQuestion: q,
        totalQuestions: total,
        selectedOptionIndex: optIdx >= 0 ? optIdx : -1,
        progress: percent,
        progressText: `${idx + 1} / ${total}`,
        isLastQuestion: idx === total - 1,
      },
      () => {
        this.persistSbtiDraft(idx, answers);
      },
    );
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

    const newQueue = buildQueue(this._shuffledRegular, this._insertIndex, answers, this._specialQuestions || []);
    this.setData({ answers }, () => {
      if (currentQuestionIndex >= newQueue.length - 1) {
        this.finish(answers);
        return;
      }
      this.applyQueue(currentQuestionIndex + 1);
    });
  },

  finish(answers) {
    try {
      wx.removeStorageSync(SBTI_DRAFT_KEY);
    } catch (e) {
      // ignore
    }
    const officialResult = computeOfficialSbti(this._quizConfig || {}, answers);
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
