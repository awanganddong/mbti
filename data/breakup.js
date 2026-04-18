/**
 * 分手原因倾向自测：你在关系里更容易被哪类问题消耗（自我觉察向）
 * 非预测、非评判；若涉及创伤，请寻求专业支持。
 */

export const BREAKUP_TYPE_ORDER = ['comm', 'trust', 'reality', 'personality', 'growth', 'boundary'];

export const breakupReasonTest = {
  title: '分手原因倾向测试',
  description: '了解你在关系里更容易被哪类问题消耗',
  questionCount: 20,
  pointsPerAnswer: 3,
  maxScore: 60,
  typeLabels: {
    comm: '沟通冷战型',
    trust: '信任裂痕型',
    reality: '现实压力型',
    personality: '性格三观型',
    growth: '感情淡化型',
    boundary: '边界窒息型',
  },
  questions: [
    {
      id: 1,
      question: '关系中哪种情况最先让你心累？',
      options: [
        { text: '吵架后长期冷战、谁也不理谁', type: 'comm' },
        { text: '发现对方说谎或隐瞒重要事', type: 'trust' },
        { text: '钱、房子、父母态度反复拉扯', type: 'reality' },
        { text: '生活习惯完全合不来，天天吵小事', type: 'personality' },
      ],
    },
    {
      id: 2,
      question: '你更难忍受？',
      options: [
        { text: '有事不直说，让你猜', type: 'comm' },
        { text: '和前任/异性边界不清', type: 'trust' },
        { text: '长期异地、见不到面', type: 'reality' },
        { text: '对方总想改变你、控制你', type: 'boundary' },
      ],
    },
    {
      id: 3,
      question: '「已读不回」对你意味着？',
      options: [
        { text: '关系出问题的信号，会焦虑', type: 'comm' },
        { text: '还好，更怕的是欺骗', type: 'trust' },
        { text: '异地常发生，会累', type: 'reality' },
        { text: '不如直接说没感觉了', type: 'growth' },
      ],
    },
    {
      id: 4,
      question: '你对「见家长/谈婚论嫁」的压力？',
      options: [
        { text: '最怕两家谈不拢、互相施压', type: 'reality' },
        { text: '最怕对方还没准备好却拖着你', type: 'growth' },
        { text: '最怕为了结婚而妥协三观', type: 'personality' },
        { text: '最怕经济问题谈崩', type: 'reality' },
      ],
    },
    {
      id: 5,
      question: '哪种背叛更让你走不出来？',
      options: [
        { text: '和别人暧昧、精神出轨', type: 'trust' },
        { text: '肉体出轨', type: 'trust' },
        { text: '长期冷暴力、当你不存在', type: 'comm' },
        { text: '在你最难时离开', type: 'growth' },
      ],
    },
    {
      id: 6,
      question: '你更怕哪种「未来」？',
      options: [
        { text: '一辈子为钱吵架', type: 'reality' },
        { text: '一辈子说不清、互相委屈', type: 'comm' },
        { text: '一辈子被管、失去自我', type: 'boundary' },
        { text: '激情没了只剩将就', type: 'growth' },
      ],
    },
    {
      id: 7,
      question: '分手导火索你更常遇到？',
      options: [
        { text: '最后一次吵架谁也不愿低头', type: 'comm' },
        { text: '翻手机发现不该看的', type: 'trust' },
        { text: '工作调动/城市选择谈崩', type: 'reality' },
        { text: '突然觉得不爱了', type: 'growth' },
      ],
    },
    {
      id: 8,
      question: '你对「性格不合」的看法？',
      options: [
        { text: '很多是沟通方式不合', type: 'comm' },
        { text: '其实是价值观底层不合', type: 'personality' },
        { text: '合不来可以磨合，不爱了才可怕', type: 'growth' },
        { text: '一方太强势就会窒息', type: 'boundary' },
      ],
    },
    {
      id: 9,
      question: '关系中你更敏感的点？',
      options: [
        { text: '对方态度突然变冷', type: 'comm' },
        { text: '对方有秘密不让你知道', type: 'trust' },
        { text: '对方对未来规划含糊', type: 'growth' },
        { text: '对方总想干涉你的社交', type: 'boundary' },
      ],
    },
    {
      id: 10,
      question: '哪种消耗让你最先想放弃？',
      options: [
        { text: '反复为同一件事吵，没有进展', type: 'comm' },
        { text: '反复怀疑、查岗、睡不着', type: 'trust' },
        { text: '为钱焦虑、看不到头', type: 'reality' },
        { text: '在一起却不开心、像室友', type: 'growth' },
      ],
    },
    {
      id: 11,
      question: '你对「分手」的想象更接近？',
      options: [
        { text: '大吵一架后彻底断联', type: 'comm' },
        { text: '发现原则问题，立刻止损', type: 'trust' },
        { text: '现实所迫，被迫分开', type: 'reality' },
        { text: '慢慢变淡，某一天和平分手', type: 'growth' },
      ],
    },
    {
      id: 12,
      question: '前任最让你耿耿于怀的是？',
      options: [
        { text: '有话不好好说', type: 'comm' },
        { text: '骗过你', type: 'trust' },
        { text: '在关键问题上退缩', type: 'reality' },
        { text: '从不尊重你的底线', type: 'boundary' },
      ],
    },
    {
      id: 13,
      question: '你更接受哪种分手理由？',
      options: [
        { text: '坦诚说「不爱了」', type: 'growth' },
        { text: '坦诚说「现实走不下去」', type: 'reality' },
        { text: '承认「我们沟通方式有问题」', type: 'comm' },
        { text: '承认「我们价值观不合」', type: 'personality' },
      ],
    },
    {
      id: 14,
      question: '恋爱中你更在意？',
      options: [
        { text: '能不能好好说话', type: 'comm' },
        { text: '能不能完全信任', type: 'trust' },
        { text: '能不能一起面对钱和家', type: 'reality' },
        { text: '能不能互相尊重边界', type: 'boundary' },
      ],
    },
    {
      id: 15,
      question: '哪种情况会让你觉得「不值得」？',
      options: [
        { text: '单方面付出、对方不回应', type: 'comm' },
        { text: '一再原谅仍被辜负', type: 'trust' },
        { text: '为对方放弃机会却换不来珍惜', type: 'reality' },
        { text: '为爱变得不像自己', type: 'boundary' },
      ],
    },
    {
      id: 16,
      question: '你对「三观」在分手里的角色？',
      options: [
        { text: '比沟通更底层，聊不透迟早分', type: 'personality' },
        { text: '三观可谈，信任没了才致命', type: 'trust' },
        { text: '三观可谈，钱和家谈不拢才致命', type: 'reality' },
        { text: '不爱了，三观也能成借口', type: 'growth' },
      ],
    },
    {
      id: 17,
      question: '分手后你更常复盘？',
      options: [
        { text: '当时要是好好沟通会不会不同', type: 'comm' },
        { text: '是不是早有迹象没敢面对', type: 'trust' },
        { text: '是不是早该谈现实条件', type: 'reality' },
        { text: '是不是早就不爱了', type: 'growth' },
      ],
    },
    {
      id: 18,
      question: '你更担心下一段关系？',
      options: [
        { text: '又陷入冷战循环', type: 'comm' },
        { text: '又遇到不诚实的人', type: 'trust' },
        { text: '又被现实打脸', type: 'reality' },
        { text: '又失去自我', type: 'boundary' },
      ],
    },
    {
      id: 19,
      question: '用一句话形容你最怕的分手？',
      options: [
        { text: '明明还在一起，却像陌生人', type: 'comm' },
        { text: '你以为是真的，其实都是假的', type: 'trust' },
        { text: '爱还在，却被现实拆开', type: 'reality' },
        { text: '为小事吵到麻木，谁也不肯让步', type: 'personality' },
      ],
    },
    {
      id: 20,
      question: '你认为「关系结束」最常见根因是？',
      options: [
        { text: '不会沟通、不会修复', type: 'comm' },
        { text: '信任一旦碎了很难重建', type: 'trust' },
        { text: '钱、房子、父母、城市选错', type: 'reality' },
        { text: '节奏不同、感情自然变淡', type: 'growth' },
      ],
    },
  ],
  results: {
    comm: {
      title: '沟通冷战型',
      description:
        '你在关系里更容易被「沟通方式」消耗：冷战、回避、已读不回、有话不直说，都会让你特别累。你未必是爱得不够，而是受不了长期悬而未决。下一段关系里，你可以更早约定「吵架规则」：可以生气，但不能消失；可以说重话，但要给台阶。若反复出现冷暴力，请认真评估是否值得继续。',
    },
    trust: {
      title: '信任裂痕型',
      description:
        '你在关系里对「诚实与边界」更敏感：隐瞒、撒谎、暧昧不清、前任纠缠，都会让你很难重建安全感。你不是多疑，而是需要清晰的边界与可验证的行动。下一段关系里，尽早对齐「什么算越界」；若信任一再被击穿，离开不是失败，是自我保护。',
    },
    reality: {
      title: '现实压力型',
      description:
        '你更容易被「现实条件」压垮：异地、金钱、父母反对、工作城市、婚嫁节奏……这些不是不爱，而是长期压力下人会撑不住。你可以提前和伴侣做「现实清单」：时间表、预算、底线。若只有一方在扛，关系很难走远；能一起扛，才有转机。',
    },
    personality: {
      title: '性格三观型',
      description:
        '你更在意「价值观与生活方式」的契合：消费习惯、家庭观念、人生目标、对错的底线，一旦长期冲突，你会感到疲惫。磨合需要双方愿意改，而不是单方面忍让。若核心三观长期对立，分手可能不是失败，是止损。',
    },
    growth: {
      title: '感情淡化型',
      description:
        '你更敏感于「感情浓度与同步」：不爱了、没感觉了、节奏不同、变成室友式相处，都会让你怀疑继续的意义。你重视情感流动与双向投入。下一段关系里，可以定期沟通「我们还好吗」；若只剩习惯没有爱，坦诚比拖着更温柔。',
    },
    boundary: {
      title: '边界窒息型',
      description:
        '你更在意「自我与边界」：被控制、被监控、失去社交与空间、为爱牺牲自我，都会让你窒息。健康的关系需要亲密与独立并存。下一段关系里，练习说「我需要」；若对方以爱之名压缩你的边界，请把自尊放在关系之上。',
    },
  },
  disclaimer:
    '本测试为自我觉察倾向，不构成心理诊断或对他人的评判。若你正经历创伤或抑郁情绪，请寻求专业心理咨询或医疗帮助。',
};

export function computeBreakupReasonResult(answers) {
  const counts = { comm: 0, trust: 0, reality: 0, personality: 0, growth: 0, boundary: 0 };
  const { questions, pointsPerAnswer } = breakupReasonTest;
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q.options[optionIndex];
    if (opt && opt.type && counts[opt.type] !== undefined) {
      counts[opt.type] += pointsPerAnswer;
    }
  });
  let bestType = BREAKUP_TYPE_ORDER[0];
  let bestScore = -1;
  BREAKUP_TYPE_ORDER.forEach((t) => {
    if (counts[t] > bestScore) {
      bestScore = counts[t];
      bestType = t;
    }
  });
  let secondType = '';
  let secondScore = -1;
  BREAKUP_TYPE_ORDER.forEach((t) => {
    if (t === bestType) return;
    if (counts[t] > secondScore) {
      secondScore = counts[t];
      secondType = t;
    }
  });
  const meta = breakupReasonTest.results[bestType];
  const secondaryLabel =
    secondType && secondScore > 0
      ? `次倾向：${breakupReasonTest.typeLabels[secondType]}（${secondScore} 分）`
      : '';
  return {
    counts,
    dominantType: bestType,
    score: Math.max(0, bestScore),
    resultTitle: meta.title,
    resultDescription: meta.description,
    secondaryLabel,
  };
}
