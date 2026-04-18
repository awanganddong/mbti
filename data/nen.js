/** 分数越高越偏「年上」气质偏好；越低越偏「年下」 */
export const nenTest = {
  title: "年上年下倾向测试",
  description: "测一测你更吃年上还是年下这一款",
  questionCount: 20,
  maxScore: 60,
  questions: [
    {
      id: 1,
      question: "你更容易被哪种气质吸引？",
      options: [
        { text: "天真俏皮、需要被照顾的感觉", score: 0 },
        { text: "活泼外向、像同龄人一样玩在一起", score: 1 },
        { text: "温柔可靠、遇事不慌", score: 2 },
        { text: "成熟稳重、阅历感很强", score: 3 },
      ],
    },
    {
      id: 2,
      question: "恋爱里你更期待哪种相处？",
      options: [
        { text: "更多是我照顾对方、被依赖", score: 0 },
        { text: "经常撒娇打闹、像小朋友恋爱", score: 1 },
        { text: "基本平等、互相支持", score: 2 },
        { text: "对方能引领我、给我安全感", score: 3 },
      ],
    },
    {
      id: 3,
      question: "对「年龄差」这件事，你的真实想法更接近？",
      options: [
        { text: "更想谈比自己小的", score: 0 },
        { text: "略小一点也可以", score: 1 },
        { text: "差不多同龄最舒服", score: 2 },
        { text: "更能接受比自己大的", score: 3 },
      ],
    },
    {
      id: 4,
      question: "遇到烦心事，你更希望对方怎么对你？",
      options: [
        { text: "先哄哄我、陪我吐槽就好", score: 0 },
        { text: "陪我一起发泄情绪", score: 1 },
        { text: "一起想办法解决", score: 2 },
        { text: "冷静帮我梳理、给我方向", score: 3 },
      ],
    },
    {
      id: 5,
      question: "你更喜欢的约会氛围是？",
      options: [
        { text: "游乐场、抓娃娃、很甜很闹", score: 0 },
        { text: "探店打卡、像朋友一样轻松", score: 1 },
        { text: "安静咖啡馆聊天", score: 2 },
        { text: "有质感的餐厅或展览、偏成熟", score: 3 },
      ],
    },
    {
      id: 6,
      question: "你对「被叫姐姐/哥哥」这类称呼的感觉？",
      options: [
        { text: "很上头，我很吃这一套", score: 0 },
        { text: "偶尔可以，挺可爱", score: 1 },
        { text: "一般，看氛围", score: 2 },
        { text: "更想被当成平等的大人相处", score: 3 },
      ],
    },
    {
      id: 7,
      question: "在关系里，你更在意对方的？",
      options: [
        { text: "黏人、可爱、会撒娇", score: 0 },
        { text: "有趣、能接梗", score: 1 },
        { text: "情绪稳定、说到做到", score: 2 },
        { text: "有担当、能扛事、让我安心托付", score: 3 },
      ],
    },
    {
      id: 8,
      question: "你更欣赏对方哪种「人生阶段感」？",
      options: [
        { text: "还在摸索、需要我陪TA长大", score: 0 },
        { text: "有冲劲、一起往前冲", score: 1 },
        { text: "工作稳定、生活有节奏", score: 2 },
        { text: "看得很透、能给我人生建议", score: 3 },
      ],
    },
    {
      id: 9,
      question: "吵架冷战时，你更吃哪一套？",
      options: [
        { text: "对方先低头卖萌求和好", score: 0 },
        { text: "一起嘻嘻哈哈翻篇", score: 1 },
        { text: "好好把话说开", score: 2 },
        { text: "对方成熟处理、主动给台阶也给方案", score: 3 },
      ],
    },
    {
      id: 10,
      question: "你对「被照顾」的想象更接近？",
      options: [
        { text: "被需要、被依赖也很甜", score: 0 },
        { text: "互相照顾就好", score: 1 },
        { text: "累了想靠一下对方", score: 2 },
        { text: "希望对方像港湾一样托住我", score: 3 },
      ],
    },
    {
      id: 11,
      question: "聊天时，你更容易上头的话题是？",
      options: [
        { text: "八卦、游戏、校园/轻松日常", score: 0 },
        { text: "吃喝玩乐、段子互怼", score: 1 },
        { text: "工作与计划", score: 2 },
        { text: "价值观、人生经历、深层交流", score: 3 },
      ],
    },
    {
      id: 12,
      question: "你对「经济/消费观」的偏好更接近？",
      options: [
        { text: "一起穷开心也行", score: 0 },
        { text: "开心最重要，别算太细", score: 1 },
        { text: "该省省该花花，要有规划", score: 2 },
        { text: "更在意对方是否稳定可靠", score: 3 },
      ],
    },
    {
      id: 13,
      question: "在朋友聚会里，你更喜欢的画面是？",
      options: [
        { text: "我带TA见朋友，像护着小朋友", score: 0 },
        { text: "并肩出现，谁也不输气场", score: 1 },
        { text: "自然融入就好", score: 2 },
        { text: "TA能从容控场，我也很安心", score: 3 },
      ],
    },
    {
      id: 14,
      question: "你对「学东西/成长」的偏好是？",
      options: [
        { text: "更喜欢鼓励TA、当TA的后盾", score: 0 },
        { text: "两个人一起摸索", score: 1 },
        { text: "互相督促进步", score: 2 },
        { text: "很吃「导师型」伴侣，愿意听TA讲道理", score: 3 },
      ],
    },
    {
      id: 15,
      question: "哪种身体接触/互动更戳你？（可选最贴近的）",
      options: [
        { text: "被依赖的抱抱、摸头杀（你更像照顾者）", score: 0 },
        { text: "打打闹闹、像好朋友", score: 1 },
        { text: "牵手并肩的稳定感", score: 2 },
        { text: "被环抱、被保护的感觉", score: 3 },
      ],
    },
    {
      id: 16,
      question: "你对「未来规划」的期待更接近？",
      options: [
        { text: "先把当下谈甜再说", score: 0 },
        { text: "走一步看一步", score: 1 },
        { text: "需要一起对齐目标", score: 2 },
        { text: "希望对方更成熟地一起规划", score: 3 },
      ],
    },
    {
      id: 17,
      question: "听到「小朋友」这种称呼，你的感受？",
      options: [
        { text: "很甜，我是照顾那一方也可以", score: 0 },
        { text: "看对象，偶尔可爱", score: 1 },
        { text: "一般，别太幼稚就行", score: 2 },
        { text: "更希望被当作独立成年人尊重", score: 3 },
      ],
    },
    {
      id: 18,
      question: "你更在意对方的哪种「社会角色感」？",
      options: [
        { text: "学生气/新人感（需要陪伴）", score: 0 },
        { text: "普通打工人也可以", score: 1 },
        { text: "稳定靠谱就行", score: 2 },
        { text: "事业有成/阅历加分很吸引我", score: 3 },
      ],
    },
    {
      id: 19,
      question: "整体来说，你对「年下恋」的感觉是？",
      options: [
        { text: "很向往，我就吃这一款", score: 0 },
        { text: "可以尝试", score: 1 },
        { text: "一般，看具体的人", score: 2 },
        { text: "更向往年上恋或成熟型", score: 3 },
      ],
    },
    {
      id: 20,
      question: "如果用一句话形容你的理想关系，你更偏向？",
      options: [
        { text: "我宠着TA，被需要就很满足", score: 0 },
        { text: "像最好的朋友那样恋爱", score: 1 },
        { text: "并肩而行，谁也不委屈谁", score: 2 },
        { text: "被稳稳接住，也被认真引领", score: 3 },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 12,
      title: "年下型",
      description:
        "你更吃「年下感」：可爱、黏人、需要你照顾或一起幼稚打闹的相处，会让你更容易上头。你不是一定要年龄小，但你更被那种轻盈、俏皮、让你想护着的气质吸引。适合你的往往是能让你产生保护欲、同时也给你情绪回馈的人。",
    },
    {
      min: 13,
      max: 24,
      title: "偏年下",
      description:
        "你整体偏年下取向：你喜欢关系里有甜度、有互动感，偶尔撒娇、打打闹闹也不违和。你也能接受成熟稳重，但太严肃或太说教可能让你没那么来电。适合你的人通常有趣、外向，最好还能让你感到轻松和被需要。",
    },
    {
      min: 25,
      max: 35,
      title: "平衡型",
      description:
        "你在年上/年下之间比较平衡：你既看重相处的轻松感，也看重稳定与成熟。你不会被单一标签绑死，更在意「合不合拍」和「能不能互相支撑」。适合你的人可能年龄差不大，或心智年龄与你不相上下，关键是尊重与并肩。",
    },
    {
      min: 36,
      max: 47,
      title: "偏年上",
      description:
        "你更偏年上取向：你欣赏温柔可靠、遇事不慌、能给你安全感的气质。比起一味卖萌，你更容易被「稳、懂、能扛事」打动。适合你的人往往情绪成熟、愿意沟通，也让你在关系里感到被照顾与被尊重。",
    },
    {
      min: 48,
      max: 60,
      title: "年上型",
      description:
        "你更吃「年上感」：成熟、阅历、引领感对你吸引力很强。你希望在关系里被认真对待，也更容易对「有担当、能给你方向」的人产生依赖与信任。适合你的往往是心智成熟、边界清晰、能在关键时刻托住你的人。年龄只是标签，气质才是关键。",
    },
  ],
};
