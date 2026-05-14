function sumToLevel(score) {
  if (score <= 3) return 'L';
  if (score === 4) return 'M';
  return 'H';
}

function levelNum(level) {
  return { L: 1, M: 2, H: 3 }[level] || 1;
}

function parsePattern(pattern) {
  return String(pattern || '').replace(/-/g, '').split('');
}

function getDrunkTriggerQuestionId(cfg) {
  return (cfg && cfg.DRUNK_TRIGGER_QUESTION_ID) ? String(cfg.DRUNK_TRIGGER_QUESTION_ID) : 'drink_gate_q2';
}

function getDrunkTriggered(cfg, answers) {
  const id = getDrunkTriggerQuestionId(cfg);
  return answers && answers[id] === 2;
}

export function computeOfficialSbti(cfg, answers) {
  const dimensionMeta = (cfg && cfg.dimensionMeta) ? cfg.dimensionMeta : {};
  const dimensionOrder = (cfg && Array.isArray(cfg.dimensionOrder)) ? cfg.dimensionOrder : [];
  const questions = (cfg && Array.isArray(cfg.questions)) ? cfg.questions : [];
  const NORMAL_TYPES = (cfg && Array.isArray(cfg.NORMAL_TYPES)) ? cfg.NORMAL_TYPES : [];
  const TYPE_LIBRARY = (cfg && cfg.TYPE_LIBRARY) ? cfg.TYPE_LIBRARY : {};

  const rawScores = {};
  const levels = {};

  Object.keys(dimensionMeta).forEach((dim) => {
    rawScores[dim] = 0;
  });
  dimensionOrder.forEach((dim) => {
    if (rawScores[dim] === undefined) rawScores[dim] = 0;
  });

  questions.forEach((q) => {
    const dim = q && q.dim ? String(q.dim) : '';
    if (!dim) return;
    if (rawScores[dim] === undefined) rawScores[dim] = 0;
    rawScores[dim] += Number(answers && answers[q.id] ? answers[q.id] : 0);
  });

  Object.entries(rawScores).forEach(([dim, score]) => {
    levels[dim] = sumToLevel(Number(score || 0));
  });

  const userVector = dimensionOrder.map((dim) => levelNum(levels[dim] || 'L'));

  const ranked = NORMAL_TYPES.map((type) => {
    const vector = parsePattern(type.pattern).map(levelNum);
    let distance = 0;
    let exact = 0;
    for (let i = 0; i < Math.max(userVector.length, vector.length); i++) {
      const diff = Math.abs(Number(userVector[i] || 1) - Number(vector[i] || 1));
      distance += diff;
      if (diff === 0) exact += 1;
    }
    const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    const lib = type && type.code && TYPE_LIBRARY[type.code] ? TYPE_LIBRARY[type.code] : {};
    return {
      ...type,
      ...lib,
      distance,
      exact,
      similarity,
    };
  }).sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  const bestNormal = ranked.length > 0 ? ranked[0] : null;
  const drunkTriggered = getDrunkTriggered(cfg, answers || {});

  let finalType;
  let modeKicker = '你的主类型';
  let badge = '';
  let sub = '';
  let special = false;

  if (drunkTriggered) {
    finalType = TYPE_LIBRARY.DRUNK ? { ...TYPE_LIBRARY.DRUNK } : {};
    modeKicker = '隐藏人格已激活';
    badge = '匹配度 100% · 酒精异常因子已接管';
    sub = '乙醇亲和性过强，系统已直接跳过常规人格审判。';
    special = true;
  } else if (bestNormal && Number(bestNormal.similarity || 0) < 60) {
    finalType = TYPE_LIBRARY.HHHH ? { ...TYPE_LIBRARY.HHHH } : { ...bestNormal };
    modeKicker = '系统强制兜底';
    badge = `标准人格库最高匹配仅 ${Number(bestNormal.similarity || 0)}%`;
    sub = '标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。';
    special = true;
  } else if (bestNormal) {
    finalType = { ...bestNormal };
  } else {
    finalType = {};
    modeKicker = '系统未命中';
    badge = '人格库为空或题库缺失';
    sub = '请稍后重试。';
    special = true;
  }

  if (!drunkTriggered && bestNormal) {
    badge = badge || `匹配度 ${Number(bestNormal.similarity || 0)}% · 精准命中 ${Number(bestNormal.exact || 0)}/15 维`;
    sub = sub || '维度命中度较高，当前结果可视为你的第一人格画像。';
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

export function buildDimListItems(cfg, levels, rawScores) {
  const dimensionOrder = (cfg && Array.isArray(cfg.dimensionOrder)) ? cfg.dimensionOrder : [];
  const dimensionMeta = (cfg && cfg.dimensionMeta) ? cfg.dimensionMeta : {};
  const DIM_EXPLANATIONS = (cfg && cfg.DIM_EXPLANATIONS) ? cfg.DIM_EXPLANATIONS : {};
  return dimensionOrder.map((dim) => {
    const level = levels && levels[dim] ? levels[dim] : 'L';
    const dimMeta = dimensionMeta[dim] || {};
    const exp = DIM_EXPLANATIONS[dim] || {};
    const explanation = exp[level] || '';
    return {
      name: dimMeta.name || dim,
      model: dimMeta.model || '',
      level,
      raw: rawScores && rawScores[dim] !== undefined ? rawScores[dim] : 0,
      explanation,
    };
  });
}

