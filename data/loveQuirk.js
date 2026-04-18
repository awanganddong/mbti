/** 恋爱癖好：恋爱里的小习惯与偏好倾向（轻松趣味向） */
export const QUIRK_TYPE_ORDER = ['clingy', 'ritual', 'touch', 'banter', 'possess', 'whisper'];

export const loveQuirkTest = {
  title: '恋爱癖好测试',
  description: '测一测你在恋爱里更吃哪一口',
  questionCount: 20,
  pointsPerAnswer: 3,
  maxScore: 60,
  typeLabels: {
    clingy: '黏人报备型',
    ritual: '仪式感型',
    touch: '贴贴肢体型',
    banter: '互怼甜宠型',
    possess: '吃醋占有型',
    whisper: '温柔昵称型',
  },
  questions: [
    {
      id: 1,
      question: '恋爱里你更上头的瞬间是？',
      options: [
        { text: '对方主动说「我到啦」「吃了啥」', type: 'clingy' },
        { text: '纪念日被记得、有小惊喜', type: 'ritual' },
        { text: '突然牵手、背后抱抱', type: 'touch' },
        { text: '互怼后对方先认输哄你', type: 'banter' },
      ],
    },
    {
      id: 2,
      question: '你对「聊天秒回」的执念？',
      options: [
        { text: '很在意，会反复看聊天框', type: 'clingy' },
        { text: '还行，但重要日子要在线', type: 'ritual' },
        { text: '不如见面贴一下实在', type: 'touch' },
        { text: '装不在意，其实截图给闺蜜', type: 'banter' },
      ],
    },
    {
      id: 3,
      question: '你更喜欢的「吃醋」打开方式？',
      options: [
        { text: '希望对方明显一点，别装大度', type: 'possess' },
        { text: '吃醋也要好好说话，不许冷暴力', type: 'whisper' },
        { text: '吃醋完要哄，要抱抱补偿', type: 'touch' },
        { text: '嘴硬说没事，其实等对方来哄', type: 'banter' },
      ],
    },
    {
      id: 4,
      question: '你对「情侣昵称」的态度？',
      options: [
        { text: '越腻越好，宝贝乖乖都可以', type: 'whisper' },
        { text: '要专属，不能跟别人一样', type: 'possess' },
        { text: '偶尔叫一次就很杀', type: 'ritual' },
        { text: '互取外号，越损越亲', type: 'banter' },
      ],
    },
    {
      id: 5,
      question: '约会结束分开时你更想？',
      options: [
        { text: '再腻歪五分钟，不想走', type: 'clingy' },
        { text: '约定下次见面时间，像仪式', type: 'ritual' },
        { text: '临别亲一下或抱抱', type: 'touch' },
        { text: '故意说「快走啦」其实舍不得', type: 'banter' },
      ],
    },
    {
      id: 6,
      question: '你对「朋友圈公开恋情」？',
      options: [
        { text: '想秀，想让别人知道TA是我的', type: 'possess' },
        { text: '重要节点发，要有文案仪式感', type: 'ritual' },
        { text: '低调也行，但头像可以暗戳戳', type: 'whisper' },
        { text: '随便，听TA的', type: 'banter' },
      ],
    },
    {
      id: 7,
      question: '吵架后你更吃哪套？',
      options: [
        { text: '对方主动来找你、说清楚', type: 'clingy' },
        { text: '带小礼物或写小纸条道歉', type: 'ritual' },
        { text: '不说话先抱紧', type: 'touch' },
        { text: '请你喝奶茶当赔罪', type: 'banter' },
      ],
    },
    {
      id: 8,
      question: '你对「语音/视频」的偏好？',
      options: [
        { text: '喜欢挂着语音各干各的', type: 'clingy' },
        { text: '睡前固定道晚安很治愈', type: 'ritual' },
        { text: '见面比屏幕香', type: 'touch' },
        { text: '故意素颜吓TA一下', type: 'banter' },
      ],
    },
    {
      id: 9,
      question: '恋人夸别人时，你更？',
      options: [
        { text: '会酸，希望TA只夸我', type: 'possess' },
        { text: '表面OK，心里记小本本', type: 'banter' },
        { text: '要补一句「但你最好」', type: 'whisper' },
        { text: '拉TA去照镜子夸回去', type: 'touch' },
      ],
    },
    {
      id: 10,
      question: '你更喜欢的「礼物」类型？',
      options: [
        { text: '手写卡片+用心挑的小东西', type: 'ritual' },
        { text: '实用+常用，看到就想到TA', type: 'clingy' },
        { text: '一起体验，比如双人票', type: 'touch' },
        { text: '恶搞礼物，笑到打鸣', type: 'banter' },
      ],
    },
    {
      id: 11,
      question: '你对「查岗」的态度？',
      options: [
        { text: '想被问「在干嘛」，证明被惦记', type: 'clingy' },
        { text: '讨厌，但偶尔吃醋很可爱', type: 'possess' },
        { text: '不如直接见面查', type: 'touch' },
        { text: '互查，公平竞技', type: 'banter' },
      ],
    },
    {
      id: 12,
      question: '你更心动的「肢体细节」？',
      options: [
        { text: '走路让你走内侧', type: 'touch' },
        { text: '凑耳边小声说话', type: 'whisper' },
        { text: '人多时护着你', type: 'possess' },
        { text: '捏脸、拍头、像撸猫', type: 'banter' },
      ],
    },
    {
      id: 13,
      question: '你对「情侣装/情侣头像」？',
      options: [
        { text: '想穿，想一眼被认出是一对', type: 'ritual' },
        { text: '头像可以，穿搭随缘', type: 'clingy' },
        { text: '太腻，暗戳戳同款色就行', type: 'whisper' },
        { text: '故意用丑图当情头整活', type: 'banter' },
      ],
    },
    {
      id: 14,
      question: '恋爱里你更怕？',
      options: [
        { text: '断联、失踪、已读不回', type: 'clingy' },
        { text: '纪念日忘记、敷衍', type: 'ritual' },
        { text: '长期见不着、只能云恋爱', type: 'touch' },
        { text: 'TA对别人也这么暖', type: 'possess' },
      ],
    },
    {
      id: 15,
      question: '你更喜欢的「撒娇」接收方式？',
      options: [
        { text: '软声叫名字、拉衣角', type: 'whisper' },
        { text: '撒娇完要补偿抱抱', type: 'touch' },
        { text: '撒娇频率高才安心', type: 'clingy' },
        { text: '傲娇式撒娇最可爱', type: 'banter' },
      ],
    },
    {
      id: 16,
      question: '你对「睡前仪式」？',
      options: [
        { text: '必须说晚安、么么', type: 'ritual' },
        { text: '连麦睡、听呼吸也行', type: 'clingy' },
        { text: '背后环抱睡最香', type: 'touch' },
        { text: '发完最后一句就跑', type: 'banter' },
      ],
    },
    {
      id: 17,
      question: '恋人跟异性单独吃饭，你更？',
      options: [
        { text: '会不开心，要哄', type: 'possess' },
        { text: '要提前说，事后要报备细节', type: 'clingy' },
        { text: '信任，但回来要抱抱', type: 'touch' },
        { text: '假装大度，秋后算账', type: 'banter' },
      ],
    },
    {
      id: 18,
      question: '你更吃哪种「霸道」？',
      options: [
        { text: '「别动，我来」', type: 'possess' },
        { text: '「以后我接你」', type: 'ritual' },
        { text: '直接揽腰带走', type: 'touch' },
        { text: '嘴上说随便，行动全安排', type: 'banter' },
      ],
    },
    {
      id: 19,
      question: '你对「撒娇求抱抱」的频率？',
      options: [
        { text: '越多越好，恋爱就要腻', type: 'clingy' },
        { text: '特定场合来一次很杀', type: 'ritual' },
        { text: '见面就要贴', type: 'touch' },
        { text: '偶尔来一次，杀伤力更大', type: 'whisper' },
      ],
    },
    {
      id: 20,
      question: '用一句话形容你的恋爱癖好？',
      options: [
        { text: '要黏、要报备、要被惦记', type: 'clingy' },
        { text: '要仪式、要惊喜、要被认真对待', type: 'ritual' },
        { text: '要贴、要抱、要少废话多行动', type: 'touch' },
        { text: '要互怼、要拉扯、要甜到牙疼', type: 'banter' },
      ],
    },
  ],
  results: {
    clingy: {
      title: '黏人报备型',
      description:
        '你在恋爱里很吃「存在感」：高频联系、行程分享、秒回与回应，都能让你安心。你喜欢被惦记、被问「在干嘛」，讨厌断联与模糊。适合你的相处模式是：明确偏爱 + 稳定互动；记得也给对方一点呼吸空间，黏人是甜，不是绑。',
    },
    ritual: {
      title: '仪式感型',
      description:
        '你在恋爱里重视「被认真对待」：纪念日、礼物、告白、专属昵称、固定晚安……这些仪式感让你感到被选择。你讨厌敷衍与凑合。适合你的伴侣要懂：浪漫不必贵，但必须有心；偶尔的小惊喜比大道理更戳你。',
    },
    touch: {
      title: '贴贴肢体型',
      description:
        '你在恋爱里更信「身体诚实」：牵手、拥抱、背后环抱、凑近说话……肢体接触比长篇聊天更让你上头。适合你的相处要多见面、多贴贴；异地时你会更辛苦，记得用语言补足温度。',
    },
    banter: {
      title: '互怼甜宠型',
      description:
        '你在恋爱里喜欢「打情骂俏」：互怼、接梗、嘴硬心软、输了先认输。你太正经会无聊，太甜会腻，偏偏要那种吵吵闹闹又很亲的感觉。适合你的伴侣要能接梗、会哄人，别把玩笑当真伤到彼此。',
    },
    possess: {
      title: '吃醋占有型',
      description:
        '你在恋爱里很在意「专属感」：希望自己是特别的、被偏爱的；适度的吃醋、占有欲、公开关系，都会让你感到被在乎。你要学会表达底线，也要给对方信任与空间——占有是在乎，不是控制。',
    },
    whisper: {
      title: '温柔昵称型',
      description:
        '你在恋爱里对「语气与称呼」很敏感：宝贝、乖乖、专属外号、耳边小声说话……温柔的称呼与私密感让你心动。你讨厌生硬与敷衍。适合你的伴侣要多用语言表达偏爱，细节越私人，你越上头。',
    },
  },
};

export function computeLoveQuirkResult(answers) {
  const counts = { clingy: 0, ritual: 0, touch: 0, banter: 0, possess: 0, whisper: 0 };
  const { questions, pointsPerAnswer } = loveQuirkTest;
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q.options[optionIndex];
    if (opt && opt.type && counts[opt.type] !== undefined) {
      counts[opt.type] += pointsPerAnswer;
    }
  });
  let bestType = QUIRK_TYPE_ORDER[0];
  let bestScore = -1;
  QUIRK_TYPE_ORDER.forEach((t) => {
    if (counts[t] > bestScore) {
      bestScore = counts[t];
      bestType = t;
    }
  });
  let secondType = '';
  let secondScore = -1;
  QUIRK_TYPE_ORDER.forEach((t) => {
    if (t === bestType) return;
    if (counts[t] > secondScore) {
      secondScore = counts[t];
      secondType = t;
    }
  });
  const meta = loveQuirkTest.results[bestType];
  const secondaryLabel =
    secondType && secondScore > 0
      ? `副癖：${loveQuirkTest.typeLabels[secondType]}（${secondScore} 分）`
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
