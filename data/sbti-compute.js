/**
 * 与原版 SBTI 网页 computeResult 逻辑一致：十五维向量 + 最近人格匹配 + 饮酒 / HHHH 兜底
 */
import {
  questions,
  dimensionMeta,
  dimensionOrder,
  NORMAL_TYPES,
  TYPE_LIBRARY,
  DIM_EXPLANATIONS,
  DRUNK_TRIGGER_QUESTION_ID,
} from "./sbti-official-data";

function sumToLevel(score) {
  if (score <= 3) return "L";
  if (score === 4) return "M";
  return "H";
}

function levelNum(level) {
  return { L: 1, M: 2, H: 3 }[level];
}

function parsePattern(pattern) {
  return pattern.replace(/-/g, "").split("");
}

function getDrunkTriggered(answers) {
  return answers[DRUNK_TRIGGER_QUESTION_ID] === 2;
}

/**
 * @param {Record<string, number>} answers 题目 id -> 选项 value（1–4 或 1–2）
 */
export function computeOfficialSbti(answers) {
  const rawScores = {};
  const levels = {};
  Object.keys(dimensionMeta).forEach((dim) => {
    rawScores[dim] = 0;
  });

  questions.forEach((q) => {
    rawScores[q.dim] += Number(answers[q.id] || 0);
  });

  Object.entries(rawScores).forEach(([dim, score]) => {
    levels[dim] = sumToLevel(score);
  });

  const userVector = dimensionOrder.map((dim) => levelNum(levels[dim]));
  const ranked = NORMAL_TYPES.map((type) => {
    const vector = parsePattern(type.pattern).map(levelNum);
    let distance = 0;
    let exact = 0;
    for (let i = 0; i < vector.length; i++) {
      const diff = Math.abs(userVector[i] - vector[i]);
      distance += diff;
      if (diff === 0) exact += 1;
    }
    const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    return {
      ...type,
      ...TYPE_LIBRARY[type.code],
      distance,
      exact,
      similarity,
    };
  }).sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  const bestNormal = ranked[0];
  const drunkTriggered = getDrunkTriggered(answers);

  let finalType;
  let modeKicker = "你的主类型";
  let badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`;
  let sub = "维度命中度较高，当前结果可视为你的第一人格画像。";
  let special = false;

  if (drunkTriggered) {
    finalType = { ...TYPE_LIBRARY.DRUNK };
    modeKicker = "隐藏人格已激活";
    badge = "匹配度 100% · 酒精异常因子已接管";
    sub = "乙醇亲和性过强，系统已直接跳过常规人格审判。";
    special = true;
  } else if (bestNormal.similarity < 60) {
    finalType = { ...TYPE_LIBRARY.HHHH };
    modeKicker = "系统强制兜底";
    badge = `标准人格库最高匹配仅 ${bestNormal.similarity}%`;
    sub = "标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。";
    special = true;
  } else {
    finalType = { ...bestNormal };
  }

  return {
    rawScores,
    levels,
    ranked,
    bestNormal,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
  };
}

export function buildDimListItems(levels, rawScores) {
  return dimensionOrder.map((dim) => {
    const level = levels[dim];
    const explanation = DIM_EXPLANATIONS[dim][level];
    return {
      name: dimensionMeta[dim].name,
      model: dimensionMeta[dim].model,
      level,
      raw: rawScores[dim],
      explanation,
    };
  });
}
