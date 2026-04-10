const { personalityTest } = require("../../data/personality-test.js");
const { getQuestionAnswerScore } = require("../../utils/personality.js");
const { saveMbtiResult } = require("../../utils/storage.js");

Page({
  data: {
    total: 0,
    index: 0,
    current: null,
    answers: [],
    progress: 0,
  },
  onLoad: function () {
    this.setData({
      total: personalityTest.length,
      index: 0,
      current: personalityTest[0],
      answers: [],
      progress: 0,
    });
  },
  onSelect: function (e) {
    var type = e.currentTarget.dataset.type;
    var idx = this.data.index;
    var answers = this.data.answers.slice();
    answers[idx] = type;
    var next = idx + 1;
    if (next >= personalityTest.length) {
      var testScores = answers.map(function (ans, i) {
        return getQuestionAnswerScore(i + 1, ans);
      });
      var timestamp = Date.now();
      saveMbtiResult({
        timestamp: timestamp,
        testAnswers: answers,
        testScores: testScores,
      });
      wx.redirectTo({
        url: "/pages/mbti-result/index?ts=" + timestamp,
      });
      return;
    }
    this.setData({
      answers: answers,
      index: next,
      current: personalityTest[next],
      progress: Math.round(((next) / personalityTest.length) * 100),
    });
  },
  onPrev: function () {
    if (this.data.index <= 0) return;
    var prev = this.data.index - 1;
    this.setData({
      index: prev,
      current: personalityTest[prev],
      progress: Math.round((prev / personalityTest.length) * 100),
    });
  },
});
