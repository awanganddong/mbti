/** 动物塑：每题选一个选项，对应类型累加同分，结果取最高类型 */
export const ANIMAL_TYPE_ORDER = ['cat', 'dog', 'fox', 'rabbit', 'wolf', 'deer'];

export const animalSuuTest = {
  title: '动物塑测试',
  description: '测一测你是哪种动物系气质',
  questionCount: 20,
  pointsPerAnswer: 3,
  maxScore: 60,
  typeLabels: {
    cat: '猫系',
    dog: '犬系',
    fox: '狐系',
    rabbit: '兔系',
    wolf: '狼系',
    deer: '鹿系',
  },
  questions: [
    {
      id: 1,
      question: '周末你更想怎么过？',
      options: [
        { text: '独自在家充电，谁也别吵我', type: 'cat' },
        { text: '约朋友出去玩，越热闹越好', type: 'dog' },
        { text: '挑个有趣局，观察全场再出手', type: 'fox' },
        { text: '和熟悉的小圈子待在一起最安心', type: 'rabbit' },
      ],
    },
    {
      id: 2,
      question: '朋友临时放你鸽子，你更可能？',
      options: [
        { text: '表面OK，心里扣分，下次再说', type: 'cat' },
        { text: '先体谅对方，问问是不是有事', type: 'deer' },
        { text: '冷静判断，值不值得继续深交', type: 'wolf' },
        { text: '有点委屈，但不一定会说', type: 'rabbit' },
      ],
    },
    {
      id: 3,
      question: '进入新环境，你更常见的状态是？',
      options: [
        { text: '先观察，不急着融入', type: 'wolf' },
        { text: '点头微笑，先混个脸熟', type: 'cat' },
        { text: '找看起来好说话的人搭话', type: 'deer' },
        { text: '等别人来靠近我', type: 'rabbit' },
      ],
    },
    {
      id: 4,
      question: '你更吃哪种「被关心」的方式？',
      options: [
        { text: '尊重我的空间，别黏太紧', type: 'cat' },
        { text: '直球表达、随时在线', type: 'dog' },
        { text: '嘴甜、会哄、会接梗', type: 'fox' },
        { text: '温柔、耐心、慢慢靠近', type: 'deer' },
      ],
    },
    {
      id: 5,
      question: '遇到冲突，你更倾向？',
      options: [
        { text: '冷处理，先让自己冷静', type: 'cat' },
        { text: '希望有人先哄哄，再讲道理', type: 'rabbit' },
        { text: '看情况，必要时绕弯解决', type: 'fox' },
        { text: '硬刚到底，护短不讲虚的', type: 'wolf' },
      ],
    },
    {
      id: 6,
      question: '别人评价你「高冷」，你会？',
      options: [
        { text: '无所谓，本来就不是自来熟', type: 'wolf' },
        { text: '赶紧解释，怕被误会', type: 'dog' },
        { text: '顺势玩梗，反正人设好用', type: 'fox' },
        { text: '有点在意，想是不是太敏感', type: 'rabbit' },
      ],
    },
    {
      id: 7,
      question: '你对「已读不回」的真实感受更接近？',
      options: [
        { text: '默认对方在忙，不追问', type: 'cat' },
        { text: '会追问或反复看聊天框', type: 'dog' },
        { text: '表面淡定，心里演小剧场', type: 'fox' },
        { text: '容易胡思乱想，需要安抚', type: 'rabbit' },
      ],
    },
    {
      id: 8,
      question: '团队合作时，你更常扮演？',
      options: [
        { text: '把关质量，关键节点出手', type: 'wolf' },
        { text: '记笔记、对齐进度，帮大家省力', type: 'rabbit' },
        { text: '协调资源，让每个人舒服', type: 'fox' },
        { text: '默默补位，不抢风头', type: 'deer' },
      ],
    },
    {
      id: 9,
      question: '你更喜欢的相处模式是？',
      options: [
        { text: '有边界感，亲密但有距离', type: 'cat' },
        { text: '高频互动，分享日常', type: 'dog' },
        { text: '暧昧拉扯、点到为止', type: 'fox' },
        { text: '稳定陪伴，细水长流', type: 'deer' },
      ],
    },
    {
      id: 10,
      question: '压力大的时候，你更可能？',
      options: [
        { text: '自己消化，不想麻烦别人', type: 'wolf' },
        { text: '找信任的人慢慢说，需要被接住', type: 'deer' },
        { text: '转移注意力，吃喝玩乐先', type: 'fox' },
        { text: '躲起来缓一缓，需要安全感', type: 'rabbit' },
      ],
    },
    {
      id: 11,
      question: '你对「撒娇」的态度更接近？',
      options: [
        { text: '不太会，也不爱看别人演', type: 'cat' },
        { text: '很吃这一套，也会对人撒娇', type: 'dog' },
        { text: '看对象，会撩但不一定黏', type: 'fox' },
        { text: '害羞，但偶尔会用一下', type: 'rabbit' },
      ],
    },
    {
      id: 12,
      question: '社交场合结束后，你更常？',
      options: [
        { text: '立刻需要独处回血', type: 'cat' },
        { text: '嘴上还能聊，心里已经想回家', type: 'cat' },
        { text: '复盘谁有趣、谁好相处', type: 'fox' },
        { text: '脑子还在想有没有说错话', type: 'deer' },
      ],
    },
    {
      id: 13,
      question: '你被夸了，第一反应是？',
      options: [
        { text: '淡定收下，内心可能暗爽', type: 'cat' },
        { text: '开心写脸上，立刻回应', type: 'dog' },
        { text: '反夸回去，场面话拉满', type: 'fox' },
        { text: '不好意思，怀疑是不是客气', type: 'rabbit' },
      ],
    },
    {
      id: 14,
      question: '你对「承诺」的看法更接近？',
      options: [
        { text: '说到做到，做不到就别答应', type: 'wolf' },
        { text: '很看重，但会看对方能不能做到', type: 'fox' },
        { text: '很认真，也会给彼此台阶', type: 'dog' },
        { text: '温柔但敏感，怕期待落空', type: 'deer' },
      ],
    },
    {
      id: 15,
      question: '你更吸引哪种气质？（凭直觉选）',
      options: [
        { text: '神秘、难捉摸、有距离感', type: 'cat' },
        { text: '阳光、直球、忠诚感', type: 'dog' },
        { text: '聪明、会撩、带点危险感', type: 'fox' },
        { text: '可靠、有气场、能扛事', type: 'wolf' },
      ],
    },
    {
      id: 16,
      question: '朋友被欺负，你更可能？',
      options: [
        { text: '先问清楚，再决定怎么站队', type: 'fox' },
        { text: '冲在前面，护短不讲理', type: 'dog' },
        { text: '冷静处理，必要时直接出手', type: 'wolf' },
        { text: '陪在身边，听TA把委屈说完', type: 'rabbit' },
      ],
    },
    {
      id: 17,
      question: '你对「计划被打乱」的耐受度？',
      options: [
        { text: '很烦，需要一点时间恢复', type: 'cat' },
        { text: '很快调整，随遇而安也行', type: 'dog' },
        { text: '顺势改计划，反而更刺激', type: 'fox' },
        { text: '容易焦虑，需要安抚', type: 'rabbit' },
      ],
    },
    {
      id: 18,
      question: '你更在意关系里的什么？',
      options: [
        { text: '尊重与空间', type: 'cat' },
        { text: '并肩与默契', type: 'wolf' },
        { text: '新鲜感与张力', type: 'fox' },
        { text: '安全感与稳定', type: 'deer' },
      ],
    },
    {
      id: 19,
      question: '用一句话形容你的社交风格？',
      options: [
        { text: '少而精，宁缺毋滥', type: 'wolf' },
        { text: '朋友多，爱热闹', type: 'dog' },
        { text: '看人下菜，游刃有余', type: 'fox' },
        { text: '温柔慢热，熟了很黏', type: 'rabbit' },
      ],
    },
    {
      id: 20,
      question: '如果给自己选一个动物塑标签，你更想是？',
      options: [
        { text: '傲娇、独立、不好拿捏', type: 'cat' },
        { text: '黏人、需要被回应', type: 'rabbit' },
        { text: '聪明、会撩、带点危险感', type: 'fox' },
        { text: '温柔、易碎、需要被照顾', type: 'deer' },
      ],
    },
  ],
  results: {
    cat: {
      title: '猫系',
      description:
        '你像猫：有自己的节奏与领地感，不喜欢被强行打扰，但熟了会温柔、会黏一下。你偏独立、挑剔、慢热，讨厌被道德绑架。你更喜欢「被选择」而不是「被追赶」，关系里需要尊重与空间。你的魅力在于：松弛、神秘、偶尔撒娇杀伤力很大。',
    },
    dog: {
      title: '犬系',
      description:
        '你像狗：热情、直球、忠诚感拉满。你喜欢高频互动、明确回应，讨厌冷场。你容易把关系看得很重，愿意付出，也希望被看见。你的魅力在于：真诚、阳光、让人有安全感。注意别把自己耗光，学会也要给自己留一点电量。',
    },
    fox: {
      title: '狐系',
      description:
        '你像狐狸：机灵、会观察、擅长接话与撩拨。你擅长读空气，知道什么时候进、什么时候退，暧昧感与分寸感并存。你不喜欢无聊，也讨厌被一眼看穿。你的魅力在于：聪明、有趣、有张力。注意别把「技巧」当成全部，真正的亲密还需要一点笨拙。',
    },
    rabbit: {
      title: '兔系',
      description:
        '你像兔子：敏感、柔软、需要安全感。你容易害羞，也可能在熟悉后很黏。你对外界情绪很敏锐，会为了避免冲突而委屈自己。你的魅力在于：干净、治愈、让人想保护。记得你的感受同样重要，不必一直做懂事的那一个。',
    },
    wolf: {
      title: '狼系',
      description:
        '你像狼：冷静、有边界、护短。你不喜欢废话，更在意行动与结果。你看起来冷，但对「自己人」非常可靠。你有领导力或独立气质，讨厌被控制。你的魅力在于：稳定、担当、压迫感与安全感并存。偶尔也可以软一点，让亲近的人走进你的领地。',
    },
    deer: {
      title: '鹿系',
      description:
        '你像鹿：温柔、优雅、带点易碎感。你共情强，善于照顾人，也渴望被温柔对待。你不喜欢冲突，更想用理解与陪伴解决。你的魅力在于：干净、治愈、让人放松。注意别把自己放得太小，你的边界同样值得被尊重。',
    },
  },
};

export function computeAnimalResult(answers) {
  const counts = { cat: 0, dog: 0, fox: 0, rabbit: 0, wolf: 0, deer: 0 };
  const { questions, pointsPerAnswer } = animalSuuTest;
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q.options[optionIndex];
    if (opt && opt.type && counts[opt.type] !== undefined) {
      counts[opt.type] += pointsPerAnswer;
    }
  });
  let bestType = ANIMAL_TYPE_ORDER[0];
  let bestScore = -1;
  ANIMAL_TYPE_ORDER.forEach((t) => {
    if (counts[t] > bestScore) {
      bestScore = counts[t];
      bestType = t;
    }
  });
  let secondType = '';
  let secondScore = -1;
  ANIMAL_TYPE_ORDER.forEach((t) => {
    if (t === bestType) return;
    if (counts[t] > secondScore) {
      secondScore = counts[t];
      secondType = t;
    }
  });
  const meta = animalSuuTest.results[bestType];
  const secondaryLabel =
    secondType && secondScore > 0
      ? `副塑：${animalSuuTest.typeLabels[secondType]}（${secondScore} 分）`
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
