const { personalityTest } = require("../data/personality-test.js");
const { personalityClassGroup } = require("../data/personality-class-groups.js");

function getQuestionAnswerScore(questionNumber, answerOption) {
  const question = personalityTest.find(function (q) {
    return q.no === questionNumber;
  });
  const opt = question.answerOptions.find(function (o) {
    return o.type === answerOption;
  });
  return opt.score;
}

function getPersonalityClassGroupByTestScores(testScores) {
  const scoreCount = testScores.reduce(
    function (acc, score) {
      acc[score] = (acc[score] || 0) + 1;
      return acc;
    },
    { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  );
  const personalityClassGroupType =
    (scoreCount.E >= scoreCount.I ? "E" : "I") +
    (scoreCount.S >= scoreCount.N ? "S" : "N") +
    (scoreCount.T >= scoreCount.F ? "T" : "F") +
    (scoreCount.J >= scoreCount.P ? "J" : "P");
  return personalityClassGroup.find(function (g) {
    return g.type === personalityClassGroupType;
  });
}

module.exports = {
  getQuestionAnswerScore,
  getPersonalityClassGroupByTestScores,
};
