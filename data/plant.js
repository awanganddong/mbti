/** 植物塑：每题选一个选项，对应类型累加同分，结果取最高类型 */
export const PLANT_TYPE_ORDER = ['cactus', 'sunflower', 'moss', 'succulent', 'bamboo', 'vine'];

export const plantSuuTest = {
  title: '植物塑测试',
  description: '测一测你是哪种植物系气质',
  questionCount: 20,
  pointsPerAnswer: 3,
  maxScore: 60,
  typeLabels: {
    cactus: '仙人掌系',
    sunflower: '向日葵系',
    moss: '苔藓系',
    succulent: '多肉系',
    bamboo: '竹系',
    vine: '藤蔓系',
  },
  questions: [
    {
      id: 1,
      question: '如果用一种生长方式形容自己，你更贴近？',
      options: [
        { text: '耐旱，一个人也能活得很稳', type: 'cactus' },
        { text: '向阳，需要光和正向反馈', type: 'sunflower' },
        { text: '在角落慢慢铺开来', type: 'moss' },
        { text: '小小的，但很饱满可爱', type: 'succulent' },
      ],
    },
    {
      id: 2,
      question: '别人越界时，你更常见的反应是？',
      options: [
        { text: '竖起刺，先保护自己', type: 'cactus' },
        { text: '直接说出来，不想憋坏心情', type: 'sunflower' },
        { text: '先退半步，观察再决定', type: 'moss' },
        { text: '表面软，心里记一笔', type: 'succulent' },
      ],
    },
    {
      id: 3,
      question: '你对「被需要」的感觉更接近？',
      options: [
        { text: '有节有度，回应也要留白', type: 'bamboo' },
        { text: '很需要，被需要说明我有价值', type: 'sunflower' },
        { text: '淡淡的就好，别太黏', type: 'moss' },
        { text: '想被温柔地依赖一下', type: 'succulent' },
      ],
    },
    {
      id: 4,
      question: '你更喜欢的关系节奏是？',
      options: [
        { text: '细水长流，湿润就行', type: 'moss' },
        { text: '高频互动，像光合作用一样热', type: 'sunflower' },
        { text: '有距离感，各自扎根', type: 'cactus' },
        { text: '绕在一起生长也可以', type: 'vine' },
      ],
    },
    {
      id: 5,
      question: '压力大时，你更像会？',
      options: [
        { text: '先攀住一件事或一个人缓一缓', type: 'vine' },
        { text: '找阳光：找人聊、找事做', type: 'sunflower' },
        { text: '躲进熟悉的小环境缓一缓', type: 'moss' },
        { text: '挺住，像竹子一样弯而不折', type: 'bamboo' },
      ],
    },
    {
      id: 6,
      question: '你对「热闹」的态度？',
      options: [
        { text: '看心情，可去可不去', type: 'succulent' },
        { text: '喜欢，能量会回来', type: 'sunflower' },
        { text: '旁观居多，安静更舒服', type: 'moss' },
        { text: '偶尔参与，久了会耗电', type: 'cactus' },
      ],
    },
    {
      id: 7,
      question: '你更在意自己的哪种「外在印象」？',
      options: [
        { text: '不好惹、有边界', type: 'cactus' },
        { text: '阳光、好相处', type: 'sunflower' },
        { text: '低调、不抢戏', type: 'moss' },
        { text: '清爽、有风骨', type: 'bamboo' },
      ],
    },
    {
      id: 8,
      question: '面对长期目标，你更常见？',
      options: [
        { text: '一节一节往上长', type: 'bamboo' },
        { text: '需要鼓励和可见进度', type: 'sunflower' },
        { text: '不声不响坚持很久', type: 'moss' },
        { text: '慢慢熬，能扛就扛', type: 'cactus' },
      ],
    },
    {
      id: 9,
      question: '你更吃哪种相处细节？',
      options: [
        { text: '尊重独处时间', type: 'cactus' },
        { text: '被夸奖、被看见', type: 'sunflower' },
        { text: '无声的陪伴就好', type: 'moss' },
        { text: '有人搭把手、一起往上走', type: 'vine' },
      ],
    },
    {
      id: 10,
      question: '你对「依赖」的看法更接近？',
      options: [
        { text: '想攀着点什么往上长', type: 'vine' },
        { text: '互相依赖也很甜', type: 'sunflower' },
        { text: '轻一点，像苔藓贴着就好', type: 'moss' },
        { text: '尽量少，靠自己最稳', type: 'cactus' },
      ],
    },
    {
      id: 11,
      question: '朋友说你「难接近」，你会？',
      options: [
        { text: '努力解释，怕误会', type: 'sunflower' },
        { text: '默认，我本来就不是甜社交', type: 'cactus' },
        { text: '笑笑，不强求被理解', type: 'moss' },
        { text: '挺直一点，懒得讨好', type: 'bamboo' },
      ],
    },
    {
      id: 12,
      question: '你更喜欢的自我状态是？',
      options: [
        { text: '自给自足，情绪自己消化', type: 'cactus' },
        { text: '开朗、有感染力', type: 'sunflower' },
        { text: '安静、柔软、不刺眼', type: 'succulent' },
        { text: '有节、有度、不纠缠', type: 'bamboo' },
      ],
    },
    {
      id: 13,
      question: '恋爱里你更怕哪种情况？',
      options: [
        { text: '被入侵边界、没有独处空间', type: 'cactus' },
        { text: '冷下来、收不到回应', type: 'sunflower' },
        { text: '被忽略，像角落里的苔藓', type: 'moss' },
        { text: '没有支点，悬空生长', type: 'vine' },
      ],
    },
    {
      id: 14,
      question: '你对「仪式感」的态度？',
      options: [
        { text: '小而美就好', type: 'succulent' },
        { text: '喜欢，生活需要高光', type: 'sunflower' },
        { text: '可有可无，别折腾我', type: 'cactus' },
        { text: '简洁克制，像竹影一样', type: 'bamboo' },
      ],
    },
    {
      id: 15,
      question: '你更吸引哪种「生长环境」？',
      options: [
        { text: '明亮温暖、鼓励多', type: 'sunflower' },
        { text: '干燥清醒、少情绪绑架', type: 'cactus' },
        { text: '湿润安静、少竞争', type: 'moss' },
        { text: '有支架、有方向可攀', type: 'vine' },
      ],
    },
    {
      id: 16,
      question: '团队合作你更常？',
      options: [
        { text: '顺着结构往上协作', type: 'vine' },
        { text: '带动气氛，往前推', type: 'sunflower' },
        { text: '补缝、垫后，不抢功', type: 'moss' },
        { text: '守住自己的一块地', type: 'cactus' },
      ],
    },
    {
      id: 17,
      question: '你对「脆弱」的表达习惯是？',
      options: [
        { text: '说出来，想被接住', type: 'sunflower' },
        { text: '很少说，说了也像开玩笑', type: 'cactus' },
        { text: '只给极少数人看', type: 'moss' },
        { text: '绷着，但会断在节骨眼上', type: 'bamboo' },
      ],
    },
    {
      id: 18,
      question: '用植物比喻你的友情观？',
      options: [
        { text: '贴地生长，不声不响在', type: 'moss' },
        { text: '一起晒太阳就开心', type: 'sunflower' },
        { text: '各自盆栽，偶尔浇水', type: 'cactus' },
        { text: '互相缠绕也互相成就', type: 'vine' },
      ],
    },
    {
      id: 19,
      question: '你更想成为哪种「气质植物」？',
      options: [
        { text: '沙漠里也能开花的那种', type: 'cactus' },
        { text: '永远朝着光的那种', type: 'sunflower' },
        { text: '石缝里也能绿的那种', type: 'moss' },
        { text: '风一吹有声音的那种', type: 'bamboo' },
      ],
    },
    {
      id: 20,
      question: '如果给自己选一个植物塑标签，你更想是？',
      options: [
        { text: '带刺、耐旱、不好拿捏', type: 'cactus' },
        { text: '治愈、圆润、好rua', type: 'succulent' },
        { text: '攀缘、缠绕、需要支点', type: 'vine' },
        { text: '青翠、有节、韧而不折', type: 'bamboo' },
      ],
    },
  ],
  results: {
    cactus: {
      title: '仙人掌系',
      description:
        '你像仙人掌：耐旱、独立、边界清晰。外表可能带刺，其实是在保护自己柔软的芯。你不爱无效社交，讨厌被情绪绑架，更习惯自给自足。你的魅力在于：稳定、清醒、很有「一个人也能活很好」的力量。记得偶尔也让信任的人靠近一点点，刺可以朝外，心还是要晒太阳。',
    },
    sunflower: {
      title: '向日葵系',
      description:
        '你像向日葵：向阳、热烈、需要光。你喜欢被看见、被回应，正向反馈会让你长得更好。你擅长把气氛点亮，也容易把能量分给别人。你的魅力在于：真诚、明亮、让人想靠近。注意别把自己榨干，阴天也要允许自己低头休息。',
    },
    moss: {
      title: '苔藓系',
      description:
        '你像苔藓：安静、贴地、在角落也能绿。你不爱抢戏，但韧性强，能慢慢铺开属于自己的空间。你敏感、细腻，喜欢湿润而温和的关系。你的魅力在于：温柔、耐看、像背景一样让人安心。别小看自己的存在，世界需要这种不刺眼的光。',
    },
    succulent: {
      title: '多肉系',
      description:
        '你像多肉：圆润、可爱、好养活（但也需要被珍惜）。你喜欢小确幸，讨厌复杂拉扯，相处要轻松、要软。你可能看起来好说话，但也有自己的小倔强。你的魅力在于：治愈、亲和、让人想捏捏。记得该拒绝时也要硬一点，别总做懂事的那盆。',
    },
    bamboo: {
      title: '竹系',
      description:
        '你像竹子：挺拔、有节、韧而不折。你讲究分寸与风骨，不喜欢黏糊纠缠，更欣赏清爽利落。你能扛事，也耐得住寂寞。你的魅力在于：克制、可靠、像风过竹林一样干净。偶尔也可以软一点，不必一直站得那么直。',
    },
    vine: {
      title: '藤蔓系',
      description:
        '你像藤蔓：会攀缘、会缠绕，也需要支架与方向。你擅长在关系里生长，喜欢有联结感，也可能在暧昧里找到养分。你灵活、适应力强，但有时也会怕悬空。你的魅力在于：缠绵、有张力、能把平凡绕出花样。记得支点要选稳，别把自己长进不值得的土壤里。',
    },
  },
};

export function computePlantResult(answers) {
  const counts = { cactus: 0, sunflower: 0, moss: 0, succulent: 0, bamboo: 0, vine: 0 };
  const { questions, pointsPerAnswer } = plantSuuTest;
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q.options[optionIndex];
    if (opt && opt.type && counts[opt.type] !== undefined) {
      counts[opt.type] += pointsPerAnswer;
    }
  });
  let bestType = PLANT_TYPE_ORDER[0];
  let bestScore = -1;
  PLANT_TYPE_ORDER.forEach((t) => {
    if (counts[t] > bestScore) {
      bestScore = counts[t];
      bestType = t;
    }
  });
  let secondType = '';
  let secondScore = -1;
  PLANT_TYPE_ORDER.forEach((t) => {
    if (t === bestType) return;
    if (counts[t] > secondScore) {
      secondScore = counts[t];
      secondType = t;
    }
  });
  const meta = plantSuuTest.results[bestType];
  const secondaryLabel =
    secondType && secondScore > 0
      ? `副塑：${plantSuuTest.typeLabels[secondType]}（${secondScore} 分）`
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
