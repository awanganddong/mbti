const { getAllMbtiResults } = require("../../utils/storage.js");
const { getPersonalityClassGroupByTestScores } = require("../../utils/personality.js");

Page({
  data: {
    list: [],
  },
  onShow: function () {
    var raw = getAllMbtiResults();
    var list = raw.map(function (r) {
      var g = getPersonalityClassGroupByTestScores(r.testScores);
      return {
        timestamp: r.timestamp,
        type: g.type,
        epithet: g.epithet,
        timeText: formatTime(r.timestamp),
      };
    });
    this.setData({ list: list });
  },
  onOpen: function (e) {
    var ts = e.currentTarget.dataset.ts;
    wx.navigateTo({
      url: "/pages/mbti-result/index?ts=" + ts,
    });
  },
});

function formatTime(ts) {
  var d = new Date(ts);
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes())
  );
}

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}
