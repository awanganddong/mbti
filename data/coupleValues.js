/**
 * 情侣三观匹配：五维（感情/金钱/家庭/人生/社交）+ 选项一致度
 * 同一设备先后完成「我」「TA」两份答卷后计算匹配度。
 */

export const CV_DIMENSIONS = [
  { key: 'love', label: '感情观' },
  { key: 'money', label: '金钱观' },
  { key: 'family', label: '家庭观' },
  { key: 'life', label: '人生与事业' },
  { key: 'social', label: '社交与边界' },
];

export const coupleValuesTest = {
  title: '情侣三观匹配测试',
  description: '五维三观画像 · 双人匹配度',
  questionCount: 22,
  instruction:
    '请按真实想法选择，没有标准答案。第一份填「你自己」，第二份请另一半在「同一台手机」上独立完成（勿代答）。',
  optionLabels: ['A', 'B', 'C', 'D'],
  questions: [
    {
      id: 1,
      question: '你对「恋爱中保持独立空间」的态度？',
      options: [
        { text: '必须有，天天黏会窒息', v: { love: 2, money: 1, family: 1, life: 3, social: 3 } },
        { text: '适度即可，希望高频互动', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
        { text: '看阶段，磨合后自然知道', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '更想被需要、被放在第一位', v: { love: 3, money: 1, family: 2, life: 1, social: 0 } },
      ],
    },
    {
      id: 2,
      question: '关于金钱，你更认同？',
      options: [
        { text: '各管各的，大额再商量', v: { love: 1, money: 3, family: 2, life: 2, social: 2 } },
        { text: '尽早合并或共同账户', v: { love: 2, money: 1, family: 3, life: 2, social: 1 } },
        { text: '谁擅长谁管，透明就好', v: { love: 2, money: 2, family: 2, life: 3, social: 2 } },
        { text: '愿意为对方花钱是爱的表现', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
      ],
    },
    {
      id: 3,
      question: '婚后与原生家庭边界，你更倾向？',
      options: [
        { text: '小家庭优先，少干涉', v: { love: 2, money: 2, family: 3, life: 2, social: 2 } },
        { text: '孝顺第一，尽量迁就父母', v: { love: 1, money: 1, family: 1, life: 1, social: 1 } },
        { text: '当面和气，关键事自己定', v: { love: 2, money: 2, family: 2, life: 2, social: 3 } },
        { text: '必须和伴侣先对齐再对外', v: { love: 3, money: 2, family: 3, life: 2, social: 2 } },
      ],
    },
    {
      id: 4,
      question: '人生排序里，你通常把什么放更前？',
      options: [
        { text: '个人成长与事业', v: { love: 1, money: 2, family: 1, life: 3, social: 2 } },
        { text: '亲密关系与家庭', v: { love: 3, money: 2, family: 3, life: 1, social: 1 } },
        { text: '健康与内心自洽', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '朋友与社会价值', v: { love: 1, money: 1, family: 1, life: 2, social: 3 } },
      ],
    },
    {
      id: 5,
      question: '恋人单独与异性朋友吃饭，你更？',
      options: [
        { text: '完全OK，信任即可', v: { love: 2, money: 1, family: 1, life: 2, social: 3 } },
        { text: '要报备，最好别单独', v: { love: 2, money: 1, family: 2, life: 1, social: 1 } },
        { text: '看对象人品，不一刀切', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '很难接受，会明确说不', v: { love: 3, money: 1, family: 2, life: 1, social: 0 } },
      ],
    },
    {
      id: 6,
      question: '吵架时你更认可的处理？',
      options: [
        { text: '当场说清楚，不过夜', v: { love: 3, money: 1, family: 2, life: 2, social: 2 } },
        { text: '先冷静，再谈', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '可以忍，但会记小本本', v: { love: 1, money: 2, family: 2, life: 2, social: 2 } },
        { text: '需要第三方或写下来对质', v: { love: 2, money: 2, family: 2, life: 3, social: 3 } },
      ],
    },
    {
      id: 7,
      question: '你对「彩礼 / 嫁妆」的态度更接近？',
      options: [
        { text: '形式而已，可有可无', v: { love: 2, money: 3, family: 2, life: 2, social: 2 } },
        { text: '按习俗，双方父母商量', v: { love: 1, money: 1, family: 2, life: 1, social: 1 } },
        { text: '反对物化，更看重诚意沟通', v: { love: 3, money: 2, family: 3, life: 2, social: 2 } },
        { text: '要有保障感，数字要谈清', v: { love: 2, money: 1, family: 2, life: 2, social: 1 } },
      ],
    },
    {
      id: 8,
      question: '要不要孩子，你更？',
      options: [
        { text: '一定要，人生完整感', v: { love: 2, money: 1, family: 1, life: 2, social: 1 } },
        { text: '可有可无，随缘', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '倾向不要，二人世界', v: { love: 2, money: 2, family: 3, life: 3, social: 2 } },
        { text: '必须认真规划后再决定', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
      ],
    },
    {
      id: 9,
      question: '工作很忙时，你对恋人的期待？',
      options: [
        { text: '理解我，少添情绪负担', v: { love: 2, money: 2, family: 2, life: 3, social: 2 } },
        { text: '再忙也要留一点时间给我', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
        { text: '一起扛，互相补位', v: { love: 3, money: 2, family: 2, life: 2, social: 2 } },
        { text: '希望对方也有事业，不依附', v: { love: 2, money: 2, family: 2, life: 3, social: 2 } },
      ],
    },
    {
      id: 10,
      question: '你对「仪式感」的看法？',
      options: [
        { text: '很重要，生活需要高光', v: { love: 3, money: 1, family: 2, life: 1, social: 2 } },
        { text: '偶尔即可，平常靠默契', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '务实派，反对形式主义', v: { love: 1, money: 3, family: 2, life: 2, social: 2 } },
        { text: '对方开心我就愿意配合', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
      ],
    },
    {
      id: 11,
      question: '发现恋人善意的谎言，你更？',
      options: [
        { text: '原则问题不能忍', v: { love: 2, money: 2, family: 2, life: 2, social: 3 } },
        { text: '看动机，保护我可原谅', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
        { text: '讨厌被骗，要透明', v: { love: 3, money: 2, family: 2, life: 2, social: 2 } },
        { text: '自己也说谎，将心比心', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
      ],
    },
    {
      id: 12,
      question: '消费观上你更？',
      options: [
        { text: '及时行乐，喜欢就买', v: { love: 1, money: 1, family: 1, life: 2, social: 2 } },
        { text: '先储蓄再享受', v: { love: 1, money: 3, family: 2, life: 2, social: 2 } },
        { text: '该花的花，该省的省', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '愿意为体验与成长花钱', v: { love: 2, money: 2, family: 2, life: 3, social: 2 } },
      ],
    },
    {
      id: 13,
      question: '过年回谁家，你更倾向？',
      options: [
        { text: '轮流或各回各家', v: { love: 2, money: 2, family: 3, life: 2, social: 2 } },
        { text: '优先男方/女方传统', v: { love: 1, money: 1, family: 1, life: 1, social: 1 } },
        { text: '谁更需要陪伴谁', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
        { text: '提前一年商量好规则', v: { love: 2, money: 2, family: 2, life: 2, social: 3 } },
      ],
    },
    {
      id: 14,
      question: '你对「长期异地」的态度？',
      options: [
        { text: '尽量不接受，会想办法聚', v: { love: 3, money: 2, family: 2, life: 2, social: 1 } },
        { text: '可接受，靠信任维系', v: { love: 2, money: 2, family: 2, life: 2, social: 3 } },
        { text: '看期限，有终点就可', v: { love: 2, money: 2, family: 2, life: 3, social: 2 } },
        { text: '基本不接受', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
      ],
    },
    {
      id: 15,
      question: '恋人查看你手机，你更？',
      options: [
        { text: '可互相公开，无秘密', v: { love: 2, money: 1, family: 2, life: 1, social: 1 } },
        { text: '要有边界，拒绝随时查', v: { love: 2, money: 2, family: 2, life: 2, social: 3 } },
        { text: '危机时可看，平时不查', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '完全不能接受', v: { love: 3, money: 2, family: 2, life: 2, social: 3 } },
      ],
    },
    {
      id: 16,
      question: '你对「家务分工」的想法？',
      options: [
        { text: '谁有空谁做，不计较', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '尽量平分，可列清单', v: { love: 2, money: 2, family: 2, life: 2, social: 3 } },
        { text: '按收入或擅长分工', v: { love: 1, money: 2, family: 2, life: 3, social: 2 } },
        { text: '请人做，节省时间陪彼此', v: { love: 2, money: 1, family: 2, life: 2, social: 1 } },
      ],
    },
    {
      id: 17,
      question: '遇到重大选择（城市/工作），你更？',
      options: [
        { text: '两人一起决定，一方妥协要补偿', v: { love: 3, money: 2, family: 2, life: 2, social: 2 } },
        { text: '优先更好的发展机会', v: { love: 1, money: 2, family: 1, life: 3, social: 2 } },
        { text: '听父母意见再综合', v: { love: 1, money: 1, family: 1, life: 2, social: 1 } },
        { text: '先听内心，再和伴侣对齐', v: { love: 2, money: 2, family: 2, life: 3, social: 3 } },
      ],
    },
    {
      id: 18,
      question: '你对「朋友圈秀恩爱」？',
      options: [
        { text: '喜欢秀，甜蜜就要晒', v: { love: 3, money: 1, family: 1, life: 1, social: 2 } },
        { text: '低调，重要日子发一下', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '基本不发，私事私了', v: { love: 2, money: 2, family: 2, life: 2, social: 3 } },
        { text: '看对方意愿', v: { love: 3, money: 1, family: 2, life: 1, social: 1 } },
      ],
    },
    {
      id: 19,
      question: '恋人想辞职追梦但收入不稳，你更？',
      options: [
        { text: '支持，一起扛风险', v: { love: 3, money: 1, family: 2, life: 2, social: 1 } },
        { text: '先谈清底线与期限', v: { love: 2, money: 2, family: 2, life: 3, social: 3 } },
        { text: '倾向稳妥，反对冲动', v: { love: 1, money: 3, family: 2, life: 2, social: 2 } },
        { text: '尊重但要求有备用方案', v: { love: 2, money: 2, family: 2, life: 3, social: 2 } },
      ],
    },
    {
      id: 20,
      question: '你对「婚前同居」？',
      options: [
        { text: '赞成，磨合必要', v: { love: 2, money: 2, family: 3, life: 2, social: 2 } },
        { text: '不接受，婚后再说', v: { love: 2, money: 2, family: 1, life: 1, social: 1 } },
        { text: '看感情进度与当地文化', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '必须父母知情再决定', v: { love: 1, money: 1, family: 1, life: 1, social: 1 } },
      ],
    },
    {
      id: 21,
      question: '你更认同的爱情观是？',
      options: [
        { text: '细水长流，陪伴最长情', v: { love: 3, money: 2, family: 3, life: 1, social: 1 } },
        { text: '需要激情与新鲜感', v: { love: 3, money: 1, family: 1, life: 2, social: 2 } },
        { text: '像战友，目标一致最重要', v: { love: 2, money: 2, family: 2, life: 3, social: 2 } },
        { text: '互相成就，各自精彩', v: { love: 2, money: 2, family: 2, life: 3, social: 3 } },
      ],
    },
    {
      id: 22,
      question: '若两人三观有差异，你更？',
      options: [
        { text: '能聊开、愿意磨合就能处', v: { love: 3, money: 2, family: 2, life: 2, social: 2 } },
        { text: '核心一致即可，细节求同存异', v: { love: 3, money: 2, family: 2, life: 2, social: 3 } },
        { text: '差异太大就难长久', v: { love: 2, money: 2, family: 2, life: 2, social: 2 } },
        { text: '愿意一起上课、读书对齐认知', v: { love: 2, money: 2, family: 2, life: 3, social: 3 } },
      ],
    },
  ],
  disclaimer:
    '本测试为价值观倾向自测与双人差异参考，不能预测感情成败。匹配度低不代表不合适，高也不代表一定幸福；真实关系需要沟通、尊重与共同成长。',
};

const DIM_KEYS = ['love', 'money', 'family', 'life', 'social'];

export function sumVectors(answers) {
  const sums = { love: 0, money: 0, family: 0, life: 0, social: 0 };
  const { questions } = coupleValuesTest;
  questions.forEach((q, idx) => {
    const optIdx = answers[idx];
    if (typeof optIdx !== 'number') return;
    const opt = q.options[optIdx];
    if (!opt || !opt.v) return;
    DIM_KEYS.forEach((k) => {
      sums[k] += opt.v[k] || 0;
    });
  });
  return sums;
}

/** 单维理论最大：每题 3 × 22 = 66（单维取题目中该维最大值累加近似：用 22×3 作为尺度） */
const SCALE = 22 * 3;

export function vectorToPercent(sums) {
  const out = {};
  DIM_KEYS.forEach((k) => {
    out[k] = Math.min(100, Math.round((sums[k] / SCALE) * 100));
  });
  return out;
}

export function computeCoupleMatch(answersA, answersB) {
  const { questions } = coupleValuesTest;
  let choiceSim = 0;
  let n = 0;
  questions.forEach((q, idx) => {
    const a = answersA[idx];
    const b = answersB[idx];
    if (typeof a !== 'number' || typeof b !== 'number') return;
    const d = Math.abs(a - b);
    choiceSim += (1 - d / 3) * 100;
    n += 1;
  });
  const choiceAvg = n > 0 ? Math.round(choiceSim / n) : 0;

  const sumA = sumVectors(answersA);
  const sumB = sumVectors(answersB);
  let dimSim = 0;
  const dimDetails = [];
  DIM_KEYS.forEach((k) => {
    const diff = Math.abs(sumA[k] - sumB[k]);
    const maxDiff = SCALE;
    const sim = Math.round((1 - Math.min(diff, maxDiff) / maxDiff) * 100);
    dimSim += sim;
    const label = CV_DIMENSIONS.find((d) => d.key === k)?.label || k;
    dimDetails.push({ key: k, label, similarity: sim, diffRaw: diff });
  });
  const dimAvg = Math.round(dimSim / DIM_KEYS.length);

  const overall = Math.round(choiceAvg * 0.45 + dimAvg * 0.55);

  return {
    overall,
    choiceAvg,
    dimAvg,
    dimDetails,
    percentA: vectorToPercent(sumA),
    percentB: vectorToPercent(sumB),
  };
}
