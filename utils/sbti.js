const {
  DIMENSION_META,
  DIMENSION_ORDER,
  DIM_EXPLANATIONS,
  NORMAL_TYPES,
  TYPE_LIBRARY,
} = require("../data/sbti/catalog.js");
const {
  SBTI_REGULAR_QUESTIONS,
  SBTI_SPECIAL_QUESTIONS,
} = require("../data/sbti/questions.js");

const DRUNK_TRIGGER_QUESTION_ID = "drink_gate_q2";

const SBTI_TYPE_IMAGE_FILES = {
  IMSB: "IMSB.png",
  BOSS: "BOSS.png",
  MUM: "MUM.png",
  FAKE: "FAKE.png",
  "Dior-s": "Dior-s.jpg",
  DEAD: "DEAD.png",
  ZZZZ: "ZZZZ.png",
  GOGO: "GOGO.png",
  FUCK: "FUCK.png",
  CTRL: "CTRL.png",
  HHHH: "HHHH.png",
  SEXY: "SEXY.png",
  OJBK: "OJBK.png",
  "JOKE-R": "JOKE-R.jpg",
  POOR: "POOR.png",
  "OH-NO": "OH-NO.png",
  MONK: "MONK.png",
  SHIT: "SHIT.png",
  "THAN-K": "THAN-K.png",
  MALO: "MALO.png",
  "ATM-er": "ATM-er.png",
  "THIN-K": "THIN-K.png",
  SOLO: "SOLO.png",
  "LOVE-R": "LOVE-R.png",
  "WOC!": "WOC.png",
  DRUNK: "DRUNK.png",
  IMFW: "IMFW.png",
};

const SBTI_IMAGE_BASE =
  "https://raw.githubusercontent.com/UnluckyNinja/SBTI-test/main/image";

function getSbtiTypeImageUrl(code) {
  const file = SBTI_TYPE_IMAGE_FILES[code];
  return file ? SBTI_IMAGE_BASE + "/" + file : undefined;
}

function shuffle(array) {
  const arr = array.slice();
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

function buildInitialQuestionOrder() {
  const shuffled = shuffle(SBTI_REGULAR_QUESTIONS);
  var insertIndex = Math.floor(Math.random() * shuffled.length) + 1;
  return shuffled
    .slice(0, insertIndex)
    .concat([SBTI_SPECIAL_QUESTIONS[0]])
    .concat(shuffled.slice(insertIndex));
}

function getVisibleQuestions(ordered, answers) {
  var visible = ordered.slice();
  var gateIndex = visible.findIndex(function (q) {
    return q.id === "drink_gate_q1";
  });
  if (gateIndex !== -1 && answers["drink_gate_q1"] === 3) {
    visible.splice(gateIndex + 1, 0, SBTI_SPECIAL_QUESTIONS[1]);
  }
  return visible;
}

function sumToLevel(score) {
  if (score <= 3) return "L";
  if (score === 4) return "M";
  return "H";
}

function levelNum(level) {
  return { L: 1, M: 2, H: 3 }[level] || 0;
}

function parsePattern(pattern) {
  return pattern.replace(/-/g, "").split("");
}

function computeSbtiResult(answers) {
  var rawScores = {};
  Object.keys(DIMENSION_META).forEach(function (dim) {
    rawScores[dim] = 0;
  });
  SBTI_REGULAR_QUESTIONS.forEach(function (q) {
    rawScores[q.dim] += Number(answers[q.id] != null ? answers[q.id] : 0);
  });
  var levels = {};
  Object.keys(rawScores).forEach(function (dim) {
    levels[dim] = sumToLevel(rawScores[dim]);
  });
  var userVector = DIMENSION_ORDER.map(function (dim) {
    return levelNum(levels[dim]);
  });
  var ranked = NORMAL_TYPES.map(function (type) {
    var vector = parsePattern(type.pattern).map(function (ch) {
      return levelNum(ch);
    });
    var distance = 0;
    var exact = 0;
    for (var i = 0; i < vector.length; i++) {
      var diff = Math.abs(userVector[i] - vector[i]);
      distance += diff;
      if (diff === 0) exact += 1;
    }
    var similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    var lib = TYPE_LIBRARY[type.code];
    return Object.assign({}, type, lib, {
      distance: distance,
      exact: exact,
      similarity: similarity,
    });
  }).sort(function (a, b) {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });
  var bestNormal = ranked[0];
  var drunkTriggered = answers[DRUNK_TRIGGER_QUESTION_ID] === 2;
  var finalType;
  var modeKicker = "你的主类型";
  var badge =
    "匹配度 " +
    bestNormal.similarity +
    "% · 精准命中 " +
    bestNormal.exact +
    "/15 维";
  var sub = "维度命中度较高，当前结果可视为你的第一人格画像。";
  var special = false;
  var secondaryType = null;
  if (drunkTriggered) {
    finalType = TYPE_LIBRARY.DRUNK;
    secondaryType = bestNormal;
    modeKicker = "隐藏人格已激活";
    badge = "匹配度 100% · 酒精异常因子已接管";
    sub = "乙醇亲和性过强，系统已直接跳过常规人格审判。";
    special = true;
  } else if (bestNormal.similarity < 60) {
    finalType = TYPE_LIBRARY.HHHH;
    modeKicker = "系统强制兜底";
    badge = "标准人格库最高匹配仅 " + bestNormal.similarity + "%";
    sub =
      "标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。";
    special = true;
  } else {
    finalType = bestNormal;
  }
  return {
    rawScores: rawScores,
    levels: levels,
    ranked: ranked,
    bestNormal: bestNormal,
    finalType: finalType,
    modeKicker: modeKicker,
    badge: badge,
    sub: sub,
    special: special,
    secondaryType: secondaryType,
  };
}

function getQuestionMetaLabel(q, previewMode) {
  if ("special" in q) return "补充题";
  return previewMode ? DIMENSION_META[q.dim].name : "维度已隐藏";
}

module.exports = {
  getSbtiTypeImageUrl,
  shuffle,
  buildInitialQuestionOrder,
  getVisibleQuestions,
  computeSbtiResult,
  getQuestionMetaLabel,
  DIMENSION_ORDER,
  DIM_EXPLANATIONS,
  DIMENSION_META,
};
