const { getPersonalityClassGroupByTestScores } = require("../../utils/personality.js");
const { getMbtiResult } = require("../../utils/storage.js");
const { splitByDotNewline } = require("../../utils/text.js");

Page({
  data: {
    loaded: false,
    group: null,
    imageSrc: "",
    descParts: [],
    successParts: [],
    explanationParts: [],
    solutionsParts: [],
    livingParts: [],
    potentialProblemSingle: false,
    potentialProblemParts: [],
    potentialProblemList: [],
    hasSuggestions: false,
    suggestionSingle: false,
    suggestionParts: [],
    suggestionList: [],
  },
  onLoad: function (query) {
    var ts = parseInt(query.ts, 10);
    if (!ts) {
      wx.showToast({ title: "参数错误", icon: "none" });
      return;
    }
    var testResult = getMbtiResult(ts);
    if (!testResult) {
      wx.showToast({ title: "未找到结果", icon: "none" });
      return;
    }
    var group = getPersonalityClassGroupByTestScores(testResult.testScores);
    var imageSrc = "/images/mbti/" + group.type + ".png";
    var potentialProblemSingle = group.potentialProblemAreas.length === 1;
    var potentialProblemParts = [];
    var potentialProblemList = [];
    if (potentialProblemSingle) {
      potentialProblemParts = splitByDotNewline(group.potentialProblemAreas[0]);
    } else {
      potentialProblemList = group.potentialProblemAreas;
    }
    var hasSuggestions = group.suggestions != null && group.suggestions.length > 0;
    var suggestionSingle = false;
    var suggestionParts = [];
    var suggestionList = [];
    if (hasSuggestions) {
      if (group.suggestions.length === 1) {
        suggestionSingle = true;
        suggestionParts = splitByDotNewline(group.suggestions[0]);
      } else {
        suggestionList = group.suggestions;
      }
    }
    this.setData({
      loaded: true,
      group: group,
      imageSrc: imageSrc,
      descParts: splitByDotNewline(group.description),
      successParts: splitByDotNewline(group.successDefinition),
      explanationParts: splitByDotNewline(group.explanationOfProblems),
      solutionsParts: splitByDotNewline(group.solutions),
      livingParts: splitByDotNewline(group.livingHappilyTips),
      potentialProblemSingle: potentialProblemSingle,
      potentialProblemParts: potentialProblemParts,
      potentialProblemList: potentialProblemList,
      hasSuggestions: hasSuggestions,
      suggestionSingle: suggestionSingle,
      suggestionParts: suggestionParts,
      suggestionList: suggestionList,
    });
  },
  onGoHome: function () {
    wx.reLaunch({ url: "/pages/index/index" });
  },
});
