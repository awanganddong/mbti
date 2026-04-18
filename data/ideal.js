/** 理想恋人取向：六类气质，得分最高为主类型 */
export const IDEAL_TYPE_ORDER = ['gentle', 'mature', 'sunny', 'cool', 'clingy', 'equal'];

export const idealPartnerTest = {
  title: '理想恋人测试',
  description: '测一测你更向往哪种恋人气质',
  questionCount: 20,
  pointsPerAnswer: 3,
  maxScore: 60,
  typeLabels: {
    gentle: '温柔治愈型',
    mature: '成熟可靠型',
    sunny: '阳光开朗型',
    cool: '高冷克制型',
    clingy: '黏人甜宠型',
    equal: '并肩势均型',
  },
  questions: [
    {
      id: 1,
      question: '你更心动的相处画面是？',
      options: [
        { text: '窝在沙发里小声聊天、被摸摸头', type: 'gentle' },
        { text: 'TA 安排好一切，你只负责安心跟着', type: 'mature' },
        { text: '一起傻笑、探店、把日子过成段子', type: 'sunny' },
        { text: '话不多，但眼神和细节都很到位', type: 'cool' },
      ],
    },
    {
      id: 2,
      question: '吵架时你更吃哪一款？',
      options: [
        { text: '先抱抱再讲道理', type: 'gentle' },
        { text: '冷静复盘、给解决方案', type: 'mature' },
        { text: '打打闹闹翻篇，不隔夜', type: 'sunny' },
        { text: '先冷一下，但会主动给台阶', type: 'cool' },
      ],
    },
    {
      id: 3,
      question: '你对「报备行程」的偏好？',
      options: [
        { text: '温柔提醒就好，不想被管太紧', type: 'gentle' },
        { text: '希望对方靠谱、说到做到', type: 'mature' },
        { text: '高频分享日常才安心', type: 'clingy' },
        { text: '各忙各的，但关键时刻一定在', type: 'equal' },
      ],
    },
    {
      id: 4,
      question: '你更怕哪种恋人？',
      options: [
        { text: '冷暴力、已读不回', type: 'gentle' },
        { text: '不靠谱、遇事就躲', type: 'mature' },
        { text: '无趣、永远正经', type: 'sunny' },
        { text: '黏到没有自我空间', type: 'equal' },
      ],
    },
    {
      id: 5,
      question: '约会你更想？',
      options: [
        { text: '安静咖啡馆、散步、细水长流', type: 'gentle' },
        { text: '有质感的餐厅或展览，像大人恋爱', type: 'mature' },
        { text: '游乐场、密室、越嗨越好', type: 'sunny' },
        { text: '小众店、深夜马路、氛围感拉满', type: 'cool' },
      ],
    },
    {
      id: 6,
      question: '你更喜欢的「撒娇」方向？',
      options: [
        { text: '软一点、会依赖我一点', type: 'clingy' },
        { text: '偶尔示弱，大部分时间稳', type: 'mature' },
        { text: '互怼式撒娇、像好朋友', type: 'sunny' },
        { text: '不轻易撒娇，但一撒就很要命', type: 'cool' },
      ],
    },
    {
      id: 7,
      question: '你对恋人事业的期待更接近？',
      options: [
        { text: '不用多厉害，但要温柔支持我', type: 'gentle' },
        { text: '有规划、能扛事，让我安心', type: 'mature' },
        { text: '一起卷也行，一起躺也行', type: 'sunny' },
        { text: '各自精彩，互相欣赏', type: 'equal' },
      ],
    },
    {
      id: 8,
      question: '你更在意的「安全感」来源？',
      options: [
        { text: '稳定的陪伴与回应', type: 'gentle' },
        { text: '遇事能扛、说到做到', type: 'mature' },
        { text: '被需要、被公开、被偏爱', type: 'clingy' },
        { text: '尊重边界、势均力敌', type: 'equal' },
      ],
    },
    {
      id: 9,
      question: '聊天时你更上头？',
      options: [
        { text: '温柔安慰、认真听你讲完', type: 'gentle' },
        { text: '给建议、帮你理清思路', type: 'mature' },
        { text: '接梗、斗图、一起哈哈哈', type: 'sunny' },
        { text: '短句、留白、让人琢磨', type: 'cool' },
      ],
    },
    {
      id: 10,
      question: '你对「仪式感」的态度？',
      options: [
        { text: '纪念日要记得，小惊喜很加分', type: 'gentle' },
        { text: '不用花哨，但要用心和尊重', type: 'mature' },
        { text: '越甜越好，不怕腻', type: 'clingy' },
        { text: '偶尔一次就够，平常靠默契', type: 'equal' },
      ],
    },
    {
      id: 11,
      question: '你更向往哪种「未来感」？',
      options: [
        { text: '一屋两人、三餐四季', type: 'gentle' },
        { text: '一起规划、一起升级打怪', type: 'mature' },
        { text: '永远像热恋，到处去旅行', type: 'sunny' },
        { text: '并肩、不拖后腿、互相成就', type: 'equal' },
      ],
    },
    {
      id: 12,
      question: '恋人吃醋时，你更接受？',
      options: [
        { text: '小声说委屈，要你哄', type: 'clingy' },
        { text: '直接沟通边界，不阴阳怪气', type: 'mature' },
        { text: '假装生气其实很可爱', type: 'sunny' },
        { text: '克制不说，但你会看出来', type: 'cool' },
      ],
    },
    {
      id: 13,
      question: '你更喜欢的「肢体互动」？',
      options: [
        { text: '牵手、靠肩、摸头杀', type: 'gentle' },
        { text: '拥抱很有力量感', type: 'mature' },
        { text: '打打闹闹、突然抱起来', type: 'sunny' },
        { text: '人少时才亲密，人多很克制', type: 'cool' },
      ],
    },
    {
      id: 14,
      question: '你对「恋人朋友圈」的想象？',
      options: [
        { text: '秀不秀都行，对我偏心就好', type: 'gentle' },
        { text: '稳重靠谱，带出去很安心', type: 'mature' },
        { text: '爱秀恩爱，巴不得全世界知道', type: 'clingy' },
        { text: '低调，但关键场合给足面子', type: 'equal' },
      ],
    },
    {
      id: 15,
      question: '你更吃哪种「反差」？',
      options: [
        { text: '对外高冷，对你很软', type: 'cool' },
        { text: '平时很稳，偶尔幼稚一下', type: 'mature' },
        { text: '看起来凶，其实很好哄', type: 'sunny' },
        { text: '看起来软，关键时刻很靠谱', type: 'gentle' },
      ],
    },
    {
      id: 16,
      question: '你更在意恋人的？',
      options: [
        { text: '情绪稳定、说话温柔', type: 'gentle' },
        { text: '责任心、执行力', type: 'mature' },
        { text: '有趣、能接梗、不冷场', type: 'sunny' },
        { text: '有主见、不随波逐流', type: 'equal' },
      ],
    },
    {
      id: 17,
      question: '冷战时你更希望对方？',
      options: [
        { text: '主动来哄、先给台阶', type: 'clingy' },
        { text: '把话说开，对事不对人', type: 'mature' },
        { text: '逗你笑，不让场面僵太久', type: 'sunny' },
        { text: '等情绪过去，再认真谈', type: 'cool' },
      ],
    },
    {
      id: 18,
      question: '你更喜欢的「称呼」氛围？',
      options: [
        { text: '宝贝、乖乖、温柔挂', type: 'gentle' },
        { text: '直呼其名但很尊重', type: 'equal' },
        { text: '互怼外号、像兄弟也像恋人', type: 'sunny' },
        { text: '不轻易叫腻，一叫就很认真', type: 'cool' },
      ],
    },
    {
      id: 19,
      question: '理想关系里你更想要？',
      options: [
        { text: '被照顾、被偏爱', type: 'clingy' },
        { text: '被引领、被托住', type: 'mature' },
        { text: '一起疯、一起扛', type: 'sunny' },
        { text: '并肩，谁也不委屈谁', type: 'equal' },
      ],
    },
    {
      id: 20,
      question: '用一句话形容你的理想恋人？',
      options: [
        { text: '温柔、耐心、让我放松', type: 'gentle' },
        { text: '靠谱、有担当、能一起过日子', type: 'mature' },
        { text: '像小太阳，在一起就开心', type: 'sunny' },
        { text: '话少但爱我，懂我奇奇怪怪', type: 'cool' },
      ],
    },
  ],
  results: {
    gentle: {
      title: '温柔治愈型',
      description:
        '你更向往温柔挂的理想恋人：说话软一点、节奏慢一点，愿意听你讲完，也愿意用细节托住你。你吃陪伴感与安全感，讨厌硬邦邦的相处。适合你的往往是情绪稳定、共情强、让你能放松做自己的那个人。',
    },
    mature: {
      title: '成熟可靠型',
      description:
        '你更吃成熟可靠型：遇事不慌、能扛事、能给你方向感。你重视承诺与行动力，讨厌不靠谱和逃避。适合你的往往是能一起规划未来、说到做到、让你在关系里感到「安心托付」的那个人。',
    },
    sunny: {
      title: '阳光开朗型',
      description:
        '你更向往阳光开朗型：有趣、外向、能把日子点亮。你喜欢高频互动与轻松氛围，讨厌沉闷与冷场。适合你的往往是能接梗、愿意陪你折腾、让你笑得很频繁的那个人。',
    },
    cool: {
      title: '高冷克制型',
      description:
        '你更吃高冷克制型：话不多但有分寸，边界感强，偏爱只给你看。你喜欢神秘感和拉扯感，也珍惜「少而精」的表达。适合你的往往是外表冷静、内心专一、关键时刻很温柔的那个人。',
    },
    clingy: {
      title: '黏人甜宠型',
      description:
        '你更向往黏人甜宠型：高频联系、明确偏爱、让你时刻感到「被需要与被看见」。你喜欢甜蜜互动与占有欲（健康范围内），讨厌冷淡与模糊。适合你的往往是愿意秀恩爱、会哄人、把你放在优先级的那个人。',
    },
    equal: {
      title: '并肩势均型',
      description:
        '你更吃并肩势均型：尊重边界、各自精彩，也能一起对齐目标。你讨厌单方面依附或单方面拯救，更想要平等、互相成就。适合你的往往是独立、有主见、能与你互相欣赏、一起往前走的那个人。',
    },
  },
};

export function computeIdealPartnerResult(answers) {
  const counts = { gentle: 0, mature: 0, sunny: 0, cool: 0, clingy: 0, equal: 0 };
  const { questions, pointsPerAnswer } = idealPartnerTest;
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q.options[optionIndex];
    if (opt && opt.type && counts[opt.type] !== undefined) {
      counts[opt.type] += pointsPerAnswer;
    }
  });
  let bestType = IDEAL_TYPE_ORDER[0];
  let bestScore = -1;
  IDEAL_TYPE_ORDER.forEach((t) => {
    if (counts[t] > bestScore) {
      bestScore = counts[t];
      bestType = t;
    }
  });
  let secondType = '';
  let secondScore = -1;
  IDEAL_TYPE_ORDER.forEach((t) => {
    if (t === bestType) return;
    if (counts[t] > secondScore) {
      secondScore = counts[t];
      secondType = t;
    }
  });
  const meta = idealPartnerTest.results[bestType];
  const secondaryLabel =
    secondType && secondScore > 0
      ? `副选：${idealPartnerTest.typeLabels[secondType]}（${secondScore} 分）`
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
