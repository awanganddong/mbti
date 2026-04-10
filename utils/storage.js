const MBTI_RESULTS_KEY = "mbti_results";

function saveMbtiResult(result) {
  const list = wx.getStorageSync(MBTI_RESULTS_KEY) || [];
  list.unshift(result);
  wx.setStorageSync(MBTI_RESULTS_KEY, list);
}

function getMbtiResult(timestamp) {
  const list = wx.getStorageSync(MBTI_RESULTS_KEY) || [];
  return list.find(function (r) {
    return r.timestamp === timestamp;
  });
}

function getAllMbtiResults() {
  return wx.getStorageSync(MBTI_RESULTS_KEY) || [];
}

module.exports = {
  saveMbtiResult,
  getMbtiResult,
  getAllMbtiResults,
};
