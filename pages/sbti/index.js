const {
  buildInitialQuestionOrder,
  getVisibleQuestions,
  computeSbtiResult,
  getQuestionMetaLabel,
  getSbtiTypeImageUrl,
  DIMENSION_ORDER,
  DIM_EXPLANATIONS,
  DIMENSION_META,
} = require("../../utils/sbti.js");

Page({
  data: {
    step: "intro",
    orderedQuestions: [],
    answers: {},
    previewMode: false,
    visibleList: [],
    progressDone: 0,
    progressTotal: 0,
    progressPercent: 0,
    canSubmit: false,
    result: null,
    resultImage: "",
    dimRows: [],
    top3: [],
    note: "",
  },
  onStart: function () {
    var that = this;
    this.setData(
      {
        step: "test",
        orderedQuestions: buildInitialQuestionOrder(),
        answers: {},
        previewMode: false,
      },
      function () {
        that.refreshVisible();
      }
    );
  },
  togglePreview: function () {
    var that = this;
    this.setData({ previewMode: !this.data.previewMode }, function () {
      that.refreshVisible();
    });
  },
  refreshVisible: function () {
    var pm = this.data.previewMode;
    var ordered = this.data.orderedQuestions;
    var answers = this.data.answers;
    var raw = getVisibleQuestions(ordered, answers);
    var visibleList = raw.map(function (q) {
      return Object.assign({}, q, {
        metaLabel: getQuestionMetaLabel(q, pm),
        selected: answers[q.id],
      });
    });
    var done = 0;
    for (var i = 0; i < raw.length; i++) {
      if (answers[raw[i].id] != null) done++;
    }
    var total = raw.length;
    this.setData({
      visibleList: visibleList,
      progressDone: done,
      progressTotal: total,
      progressPercent: total ? Math.round((done / total) * 100) : 0,
      canSubmit: done === total && total > 0,
    });
  },
  onPick: function (e) {
    var qid = e.currentTarget.dataset.qid;
    var value = Number(e.currentTarget.dataset.value);
    var answers = Object.assign({}, this.data.answers);
    answers[qid] = value;
    if (qid === "drink_gate_q1" && value !== 3) {
      delete answers["drink_gate_q2"];
    }
    this.setData({ answers: answers }, this.refreshVisible.bind(this));
  },
  onSubmit: function () {
    if (!this.data.canSubmit) return;
    var result = computeSbtiResult(this.data.answers);
    var img = getSbtiTypeImageUrl(result.finalType.code) || "";
    var dimRows = DIMENSION_ORDER.map(function (dim) {
      var level = result.levels[dim];
      return {
        dim: dim,
        name: DIMENSION_META[dim].name,
        level: level,
        score: result.rawScores[dim],
        explain: DIM_EXPLANATIONS[dim][level],
      };
    });
    var top3 = result.ranked.slice(0, 3);
    var note = result.special
      ? "本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。"
      : "本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。";
    this.setData({
      step: "result",
      result: result,
      resultImage: img,
      dimRows: dimRows,
      top3: top3,
      note: note,
    });
  },
  onRestart: function () {
    this.setData({
      step: "intro",
      orderedQuestions: [],
      answers: {},
      visibleList: [],
      result: null,
    });
  },
  onHome: function () {
    wx.reLaunch({ url: "/pages/index/index" });
  },
});
