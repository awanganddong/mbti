function normalizeQuestions(config) {
  const questions = config && Array.isArray(config.questions) ? config.questions : [];
  return questions;
}

export function tallyTypeAnswers(config, answers) {
  const questions = normalizeQuestions(config);
  const pointsPerAnswer = Number(config && config.pointsPerAnswer ? config.pointsPerAnswer : 1);
  const typeOrder = config && Array.isArray(config.typeOrder) ? config.typeOrder : [];
  const typeLabels = (config && config.typeLabels) ? config.typeLabels : {};

  const order = typeOrder.length > 0 ? typeOrder : Object.keys(typeLabels);
  const counts = {};
  order.forEach((t) => {
    counts[t] = 0;
  });

  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q && Array.isArray(q.options) ? q.options[optionIndex] : null;
    const t = opt && opt.type ? String(opt.type) : '';
    if (t && counts[t] !== undefined) {
      counts[t] += pointsPerAnswer;
    }
  });

  let bestType = order[0] || '';
  let bestScore = -1;
  order.forEach((t) => {
    const s = counts[t];
    if (typeof s !== 'number') return;
    if (s > bestScore) {
      bestScore = s;
      bestType = t;
    }
  });

  let secondType = '';
  let secondScore = -1;
  order.forEach((t) => {
    if (t === bestType) return;
    const s = counts[t];
    if (typeof s !== 'number') return;
    if (s > secondScore) {
      secondScore = s;
      secondType = t;
    }
  });

  return {
    counts,
    bestType,
    bestScore: Math.max(0, bestScore),
    secondType,
    secondScore: Math.max(0, secondScore),
  };
}

export function sumScoreAnswers(config, answers) {
  const questions = normalizeQuestions(config);
  let sum = 0;
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q && Array.isArray(q.options) ? q.options[optionIndex] : null;
    const s = opt && opt.score !== undefined ? Number(opt.score) : NaN;
    if (Number.isFinite(s)) {
      sum += s;
    }
  });
  return sum;
}

export function pickRangeResult(results, score) {
  const list = Array.isArray(results) ? results : [];
  if (list.length === 0) return null;
  const s = Number(score);
  const found = list.find((r) => typeof r === 'object' && r && s >= Number(r.min) && s <= Number(r.max));
  return found || list[list.length - 1];
}

export function computeAceScore(config, answers) {
  const questions = normalizeQuestions(config);
  let sum = 0;
  questions.forEach((q, idx) => {
    const opt = answers[idx];
    if (typeof opt !== 'number' || opt < 0 || opt > 3) return;
    const scores = q && Array.isArray(q.scores) ? q.scores : null;
    const v = scores ? scores[opt] : null;
    if (typeof v === 'number') sum += v;
  });
  return sum;
}

export function computeSdsScores(config, answers) {
  const questions = normalizeQuestions(config);
  let raw = 0;
  questions.forEach((q, idx) => {
    const optIdx = answers[idx];
    if (typeof optIdx !== 'number' || optIdx < 0 || optIdx > 3) return;
    const reverse = Boolean(q && q.reverse);
    const v = reverse ? 4 - optIdx : optIdx + 1;
    raw += v;
  });
  const standard = Math.round(raw * 1.25 * 10) / 10;
  const standardInt = Math.round(raw * 1.25);
  const result = pickRangeResult(config && config.results ? config.results : [], standardInt);
  return { raw, standard, standardInt, result };
}

export function computeJung8Result(config, answers) {
  const order = config && Array.isArray(config.typeOrder) ? config.typeOrder : [];
  const typeLabels = (config && config.typeLabels) ? config.typeLabels : {};
  const typeByDominantAux = (config && config.typeByDominantAux) ? config.typeByDominantAux : {};
  const functionHints = (config && config.functionHints) ? config.functionHints : {};
  const { counts, bestType, bestScore } = tallyTypeAnswers(config, answers);

  const sorted = order.map((key) => ({
    key,
    label: typeLabels[key] || key,
    score: counts[key] || 0,
  })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return order.indexOf(a.key) - order.indexOf(b.key);
  });

  const maxScore = sorted.length > 0 ? sorted[0].score : 0;
  const sortedWithBar = sorted.map((item) => ({
    ...item,
    barPercent: maxScore > 0 ? Math.round((item.score / maxScore) * 100) : 0,
  }));

  const first = sorted[0];
  const second = sorted[1];
  const pairKey = first && second ? `${first.key}-${second.key}` : '';
  const typeGuess = typeByDominantAux[pairKey] || '';
  const topTwoLabel = first && second ? `${first.key} · ${second.key}` : '';
  const paragraphs = [];
  paragraphs.push(
    `你的八维得分中，目前排序靠前的是「${first ? first.label : ''}」与「${second ? second.label : ''}」。以下为常见功能简述，帮助你对照理解。`
  );
  sorted.slice(0, 4).forEach((item) => {
    const hint = functionHints[item.key];
    if (hint) {
      paragraphs.push(`${item.label}（${item.score} 分）：${hint}`);
    }
  });
  if (typeGuess) {
    paragraphs.push(
      `参考：得分最高的两项顺序若对应常见「主导功能—辅助功能」组合，可能与 ${typeGuess} 的典型栈有相似之处（个体差异很大，勿贴标签）。`
    );
  } else {
    paragraphs.push(
      '你的前两项功能组合与常见 16 型「主—辅」命名不完全重合也正常，可结合生活情境理解各功能强弱。'
    );
  }
  if (config && config.disclaimer) {
    paragraphs.push(String(config.disclaimer));
  }

  return {
    counts,
    dominantType: bestType,
    score: Math.max(0, bestScore),
    sortedScores: sortedWithBar,
    topTwoLabel,
    typeGuess,
    resultTitle: '荣格八维排序',
    resultDescription: paragraphs.join('\n\n'),
  };
}

export function sumVectors(config, answers) {
  const questions = normalizeQuestions(config);
  const sums = { love: 0, money: 0, family: 0, life: 0, social: 0 };
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q && Array.isArray(q.options) ? q.options[optionIndex] : null;
    const v = opt && typeof opt.v === 'object' && opt.v ? opt.v : null;
    if (!v) return;
    sums.love += Number(v.love || 0);
    sums.money += Number(v.money || 0);
    sums.family += Number(v.family || 0);
    sums.life += Number(v.life || 0);
    sums.social += Number(v.social || 0);
  });
  return sums;
}

export function vectorToPercent(vec) {
  const total = Number(vec.love || 0) + Number(vec.money || 0) + Number(vec.family || 0) + Number(vec.life || 0) + Number(vec.social || 0);
  if (total <= 0) {
    return { love: 0, money: 0, family: 0, life: 0, social: 0 };
  }
  return {
    love: Math.round((Number(vec.love || 0) / total) * 100),
    money: Math.round((Number(vec.money || 0) / total) * 100),
    family: Math.round((Number(vec.family || 0) / total) * 100),
    life: Math.round((Number(vec.life || 0) / total) * 100),
    social: Math.round((Number(vec.social || 0) / total) * 100),
  };
}

export function computeCoupleMatch(config, answersA, answersB) {
  const dims = config && Array.isArray(config.dimensions) ? config.dimensions : [];
  const vecA = sumVectors(config, answersA);
  const vecB = sumVectors(config, answersB);
  const percentA = vectorToPercent(vecA);
  const percentB = vectorToPercent(vecB);

  const dimDetails = dims.map((d) => {
    const key = d.key;
    const a = Number(percentA[key] || 0);
    const b = Number(percentB[key] || 0);
    const similarity = Math.max(0, 100 - Math.abs(a - b));
    return { key, label: d.label, similarity };
  });

  const dimAvg = dimDetails.length > 0
    ? Math.round(dimDetails.reduce((sum, d) => sum + d.similarity, 0) / dimDetails.length)
    : 0;

  const choiceSimilarities = [];
  const qs = normalizeQuestions(config);
  qs.forEach((q, idx) => {
    const a = answersA[idx];
    const b = answersB[idx];
    if (typeof a !== 'number' || typeof b !== 'number') return;
    const same = a === b;
    choiceSimilarities.push(same ? 100 : 0);
  });
  const choiceAvg = choiceSimilarities.length > 0
    ? Math.round(choiceSimilarities.reduce((sum, v) => sum + v, 0) / choiceSimilarities.length)
    : 0;

  const overall = Math.round((choiceAvg * 0.4) + (dimAvg * 0.6));
  return { overall, choiceAvg, dimAvg, percentA, percentB, dimDetails };
}

