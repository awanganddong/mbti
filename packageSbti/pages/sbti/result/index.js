import {
  buildDimListItems,
  sbtiShareImageUrl,
  sbtiTypeImageUrl,
} from "../../../../data/sbti";

Page({
  data: {
    empty: false,
    modeKicker: "",
    resultTypeLine: "",
    matchBadge: "",
    typeSub: "",
    posterCaption: "",
    resultImageUrl: "",
    resultDescriptionParagraphs: [],
    dimList: [],
    funNote: "",
    currentTestResultId: "",
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });

    const testResultId = options.testResultId;
    this.setData({
      currentTestResultId: testResultId || "",
    });

    const history = wx.getStorageSync("sbtiTestHistory") || [];
    let record = null;
    if (testResultId) {
      record = history.find((item) => item.timestamp.toString() === testResultId) || null;
    } else {
      record = history.length > 0 ? history[0] : null;
    }

    if (!record || !record.officialResult) {
      this.setData({ empty: true });
      return;
    }

    const { officialResult } = record;
    const ft = officialResult.finalType;
    const dimList = buildDimListItems(officialResult.levels, officialResult.rawScores);
    const funNote = officialResult.special
      ? "本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。"
      : "本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。";

    this.setData({
      empty: false,
      modeKicker: officialResult.modeKicker,
      resultTypeLine: ft.code && ft.cn ? `${ft.code}（${ft.cn}）` : "",
      matchBadge: officialResult.badge,
      typeSub: officialResult.sub,
      posterCaption: ft.intro || "",
      resultImageUrl: sbtiTypeImageUrl(ft.code) || sbtiShareImageUrl,
      resultDescriptionParagraphs: this.splitIntoParagraphs(ft.desc || ""),
      dimList,
      funNote,
      currentTestResultId: record.timestamp ? String(record.timestamp) : testResultId || "",
    });
  },

  splitIntoParagraphs(text) {
    if (!text) return [];
    const normalized = String(text).replace(/\s+/g, " ").trim();
    if (!normalized) return [];
    const parts = [];
    let current = "";
    for (let i = 0; i < normalized.length; i++) {
      const ch = normalized[i];
      current += ch;
      if (ch === "。" || ch === "！" || ch === "？" || ch === "." || ch === "!" || ch === "?") {
        const trimmed = current.trim();
        if (trimmed) parts.push(trimmed);
        current = "";
      }
    }
    const tail = current.trim();
    if (tail) parts.push(tail);
    return parts;
  },

  onShareAppMessage() {
    const testResultId = this.data.currentTestResultId;
    const title = this.data.resultTypeLine
      ? `我的 SBTI：${this.data.resultTypeLine}`
      : "SBTI 人格测试结果";
    return {
      title,
      path: testResultId
        ? `/packageSbti/pages/sbti/result/index?testResultId=${testResultId}`
        : "/packageSbti/pages/sbti/index",
      imageUrl: this.data.resultImageUrl || sbtiShareImageUrl,
    };
  },

  onShareTimeline() {
    const testResultId = this.data.currentTestResultId;
    const title = this.data.resultTypeLine || "SBTI 人格测试";
    return {
      title,
      query: testResultId ? `testResultId=${testResultId}` : "",
      imageUrl: this.data.resultImageUrl || sbtiShareImageUrl,
    };
  },

  shareTimelineTip() {
    wx.showToast({
      title: "点击右上角 ··· 分享到朋友圈",
      icon: "none",
    });
  },

  goHome() {
    wx.navigateTo({
      url: "/pages/index/index",
    });
  },

  takeTestAgain() {
    wx.navigateTo({
      url: "/packageSbti/pages/sbti/index",
    });
  },
});
