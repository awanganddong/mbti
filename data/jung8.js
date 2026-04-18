/**
 * 荣格八维认知功能自测（娱乐向）
 * Ne / Ni / Se / Si / Te / Ti / Fe / Fi
 */

export const JUNG8_ORDER = ['Ne', 'Ni', 'Se', 'Si', 'Te', 'Ti', 'Fe', 'Fi'];

export const jung8Test = {
  title: '荣格八维人格测试',
  description: '测一测你的认知功能倾向（Ne Ni Se Si Te Ti Fe Fi）',
  questionCount: 32,
  pointsPerAnswer: 3,
  /** 单维理论最高分：若每题都选该维 */
  maxSingle: 32 * 3,
  typeLabels: {
    Ne: 'Ne 外倾直觉',
    Ni: 'Ni 内倾直觉',
    Se: 'Se 外倾感觉',
    Si: 'Si 内倾感觉',
    Te: 'Te 外倾思考',
    Ti: 'Ti 内倾思考',
    Fe: 'Fe 外倾情感',
    Fi: 'Fi 内倾情感',
  },
  /** 常见主功能-辅功能组合与 16 型对照（得分前两项顺序匹配时参考） */
  typeByDominantAux: {
    'Ni-Te': 'INTJ',
    'Ni-Fe': 'INFJ',
    'Ne-Ti': 'ENTP',
    'Ne-Fi': 'ENFP',
    'Si-Te': 'ISTJ',
    'Si-Fe': 'ISFJ',
    'Se-Ti': 'ESTP',
    'Se-Fi': 'ESFP',
    'Te-Ni': 'ENTJ',
    'Te-Si': 'ESTJ',
    'Fe-Ni': 'ENFJ',
    'Fe-Si': 'ESFJ',
    'Ti-Ne': 'INTP',
    'Ti-Se': 'ISTP',
    'Fi-Ne': 'INFP',
    'Fi-Se': 'ISFP',
  },
  functionHints: {
    Ne: '发散联想、探索可能性、连接远距概念，讨厌被过早定型。',
    Ni: '收敛意象、抓趋势与隐喻、相信直觉图景，追求「就是那种感觉」。',
    Se: '当下感官与行动、抓现实细节、顺势应变，体验即信息。',
    Si: '经验比对、稳定流程、细节记忆与身体感，重视「以前怎样」。',
    Te: '外部效率、可度量结果、结构与资源调度，先看能不能成。',
    Ti: '内在逻辑自洽、精确分类与拆解，先问「这说法成立吗」。',
    Fe: '群体氛围、共识与得体表达，情绪场域里的协调与照顾。',
    Fi: '个人价值与真实感受，边界清晰的好恶，拒绝违背本心。',
  },
  questions: [
    {
      id: 1,
      question: '面对新项目，你更先启动的是？',
      options: [
        { text: '脑暴一堆方向和「万一」', type: 'Ne' },
        { text: '隐约感到走向，先定大图景', type: 'Ni' },
        { text: '先看当下资源与可执行动作', type: 'Se' },
        { text: '对照以往案例与既有流程', type: 'Si' },
      ],
    },
    {
      id: 2,
      question: '争论时，你更在意？',
      options: [
        { text: '结论是否可验证、谁能拍板', type: 'Te' },
        { text: '推理链条是否自洽', type: 'Ti' },
        { text: '场面是否伤感情、大家是否舒服', type: 'Fe' },
        { text: '是否符合我的原则与底线', type: 'Fi' },
      ],
    },
    {
      id: 3,
      question: '学习新东西，你更吃哪种方式？',
      options: [
        { text: '多角度类比、跨界联想', type: 'Ne' },
        { text: '抓住核心隐喻，一次顿悟', type: 'Ni' },
        { text: '上手练、边做边会', type: 'Se' },
        { text: '按步骤复盘、对照笔记', type: 'Si' },
      ],
    },
    {
      id: 4,
      question: '团队里你更常补位？',
      options: [
        { text: '盯目标、拆任务、推进度', type: 'Te' },
        { text: '厘清概念、堵逻辑漏洞', type: 'Ti' },
        { text: '圆场、照顾士气与关系', type: 'Fe' },
        { text: '坚持认为对的方向，哪怕少数', type: 'Fi' },
      ],
    },
    {
      id: 5,
      question: '空闲时脑子更常？',
      options: [
        { text: '随机蹦新点子', type: 'Ne' },
        { text: '反复琢磨一个意象或主题', type: 'Ni' },
        { text: '想马上做点什么具体的事', type: 'Se' },
        { text: '回味细节、怀旧或复盘', type: 'Si' },
      ],
    },
    {
      id: 6,
      question: '别人评价你，你更敏感于？',
      options: [
        { text: '能力行不行、结果硬不硬', type: 'Te' },
        { text: '说法前后矛不矛盾', type: 'Ti' },
        { text: '是不是在当众让你难堪', type: 'Fe' },
        { text: '有没有误解你的为人', type: 'Fi' },
      ],
    },
    {
      id: 7,
      question: '做计划时你更依赖？',
      options: [
        { text: '保留多种备选，随时改路线', type: 'Ne' },
        { text: '相信内心时间表与走向感', type: 'Ni' },
        { text: '看眼前机会，灵活插入', type: 'Se' },
        { text: '沿用习惯节奏与清单', type: 'Si' },
      ],
    },
    {
      id: 8,
      question: '你更头疼哪种同事？',
      options: [
        { text: '只画饼不落地', type: 'Te' },
        { text: '偷换概念、胡搅蛮缠', type: 'Ti' },
        { text: '爱搞小团体与阴阳怪气', type: 'Fe' },
        { text: '虚伪、踩你价值观', type: 'Fi' },
      ],
    },
    {
      id: 9,
      question: '压力下你更可能？',
      options: [
        { text: '疯狂找新出路、换思路', type: 'Ne' },
        { text: '缩回内在叙事里消化', type: 'Ni' },
        { text: '运动或做事发泄掉', type: 'Se' },
        { text: '按老办法熬过去', type: 'Si' },
      ],
    },
    {
      id: 10,
      question: '你更欣赏的领导风格？',
      options: [
        { text: '目标清晰、奖惩分明', type: 'Te' },
        { text: '讲道理、尊重专业判断', type: 'Ti' },
        { text: '关心人、愿意听情绪', type: 'Fe' },
        { text: '有原则、敢为团队扛雷', type: 'Fi' },
      ],
    },
    {
      id: 11,
      question: '聊天时你更常？',
      options: [
        { text: '抛梗、联想、话题乱跳', type: 'Ne' },
        { text: '聊意义、命运感、抽象命题', type: 'Ni' },
        { text: '聊吃喝玩、现场八卦', type: 'Se' },
        { text: '聊旧事、共同回忆', type: 'Si' },
      ],
    },
    {
      id: 12,
      question: '你更在意自己的哪种「人设」？',
      options: [
        { text: '靠谱、能扛事', type: 'Te' },
        { text: '聪明、讲理', type: 'Ti' },
        { text: '好相处、情商在线', type: 'Fe' },
        { text: '真实、不装', type: 'Fi' },
      ],
    },
    {
      id: 13,
      question: '面对规则，你更倾向？',
      options: [
        { text: '若阻碍效率就改规则', type: 'Te' },
        { text: '先问规则底层是否合理', type: 'Ti' },
        { text: '照顾大家接受度再谈改', type: 'Fe' },
        { text: '违背良心就宁可不合群', type: 'Fi' },
      ],
    },
    {
      id: 14,
      question: '旅行时你更享受？',
      options: [
        { text: '临时改行程、偶遇惊喜', type: 'Ne' },
        { text: '为某个「必去」意象打卡', type: 'Ni' },
        { text: '当下感官刺激拉满', type: 'Se' },
        { text: '熟悉路线与安全感', type: 'Si' },
      ],
    },
    {
      id: 15,
      question: '写东西时你更顺？',
      options: [
        { text: '想到哪写到哪', type: 'Ne' },
        { text: '先立意，再一气呵成', type: 'Ni' },
        { text: '写所见所闻、具体画面', type: 'Se' },
        { text: '堆素材、润色细节', type: 'Si' },
      ],
    },
    {
      id: 16,
      question: '冲突后你更想先？',
      options: [
        { text: '把事情结果说清楚', type: 'Te' },
        { text: '把各自逻辑摊开来对', type: 'Ti' },
        { text: '把情绪安抚好再谈事', type: 'Fe' },
        { text: '确认自己还能不能尊重对方', type: 'Fi' },
      ],
    },
    {
      id: 17,
      question: '你更怕哪种浪费？',
      options: [
        { text: '时间精力没产出', type: 'Te' },
        { text: '思维混乱、概念不清', type: 'Ti' },
        { text: '关系搞僵、场面难看', type: 'Fe' },
        { text: '违背内心去将就', type: 'Fi' },
      ],
    },
    {
      id: 18,
      question: '回忆往事，你更常？',
      options: [
        { text: '记得当时各种可能性', type: 'Ne' },
        { text: '提炼成一个人生母题', type: 'Ni' },
        { text: '记得画面、声音、动作', type: 'Se' },
        { text: '记得日期、细节、身体感受', type: 'Si' },
      ],
    },
    {
      id: 19,
      question: '购物时你更？',
      options: [
        { text: '被新奇功能吸引', type: 'Ne' },
        { text: '为「就是它」的感觉下单', type: 'Ni' },
        { text: '当场试用、手感优先', type: 'Se' },
        { text: '买常用款、减少试错', type: 'Si' },
      ],
    },
    {
      id: 20,
      question: '被否定时，你更内伤的是？',
      options: [
        { text: '否定我的能力与业绩', type: 'Te' },
        { text: '说我思路不清', type: 'Ti' },
        { text: '当众不给我面子', type: 'Fe' },
        { text: '说我虚伪或没良心', type: 'Fi' },
      ],
    },
    {
      id: 21,
      question: '你更喜欢的游戏/娱乐？',
      options: [
        { text: '开放探索、多结局', type: 'Ne' },
        { text: '有深意、能解读象征', type: 'Ni' },
        { text: '刺激、竞技、即时反馈', type: 'Se' },
        { text: '养成、收集、熟悉系统', type: 'Si' },
      ],
    },
    {
      id: 22,
      question: '开会时你更常？',
      options: [
        { text: '催结论、定责任人', type: 'Te' },
        { text: '抠定义与前提', type: 'Ti' },
        { text: '观察谁尴尬、打圆场', type: 'Fe' },
        { text: '心里打分值不值得跟', type: 'Fi' },
      ],
    },
    {
      id: 23,
      question: '你对「传统」的态度？',
      options: [
        { text: '好用就保留，不好就换', type: 'Te' },
        { text: '拆开看哪些经得起推敲', type: 'Ti' },
        { text: '尊重多数人的情感联结', type: 'Fe' },
        { text: '与个人价值冲突就疏远', type: 'Fi' },
      ],
    },
    {
      id: 24,
      question: '灵感枯竭时你更？',
      options: [
        { text: '换领域乱翻找刺激', type: 'Ne' },
        { text: '静下来等图景浮现', type: 'Ni' },
        { text: '出门走走、换感官输入', type: 'Se' },
        { text: '重读旧作、复用老模板', type: 'Si' },
      ],
    },
    {
      id: 25,
      question: '你更反感的评价？',
      options: [
        { text: '不靠谱、没执行力', type: 'Te' },
        { text: '不讲逻辑、双标', type: 'Ti' },
        { text: '冷漠、不懂人情', type: 'Fe' },
        { text: '虚伪、讨好型', type: 'Fi' },
      ],
    },
    {
      id: 26,
      question: '亲密关系中你更在意？',
      options: [
        { text: '分工与未来规划', type: 'Te' },
        { text: '能深度对话、讲清楚', type: 'Ti' },
        { text: '被公开认可、被照顾感受', type: 'Fe' },
        { text: '被理解底线与独特性', type: 'Fi' },
      ],
    },
    {
      id: 27,
      question: '你更常做的梦或幻想类型？',
      options: [
        { text: '平行宇宙、离奇剧情', type: 'Ne' },
        { text: '预言感、符号化场景', type: 'Ni' },
        { text: '冒险、追逐、感官强', type: 'Se' },
        { text: '旧场景反复、细节清晰', type: 'Si' },
      ],
    },
    {
      id: 28,
      question: '教别人时你更习惯？',
      options: [
        { text: '给步骤、检查表、KPI', type: 'Te' },
        { text: '从原理讲到例外', type: 'Ti' },
        { text: '鼓励、示范、带气氛', type: 'Fe' },
        { text: '强调「你要自己想清楚」', type: 'Fi' },
      ],
    },
    {
      id: 29,
      question: '你对「效率」的理解更接近？',
      options: [
        { text: '单位时间产出最大化', type: 'Te' },
        { text: '少返工、概念一次对齐', type: 'Ti' },
        { text: '少内耗、团队心齐', type: 'Fe' },
        { text: '不违背节奏与真实意愿', type: 'Fi' },
      ],
    },
    {
      id: 30,
      question: '陌生社交场合，你更？',
      options: [
        { text: '接话题、抛新梗', type: 'Ne' },
        { text: '观察全场、心里有数', type: 'Ni' },
        { text: '找事做、减少尬聊', type: 'Se' },
        { text: '找熟人贴、减少消耗', type: 'Si' },
      ],
    },
    {
      id: 31,
      question: '你更想被夸？',
      options: [
        { text: '能干、有结果', type: 'Te' },
        { text: '通透、有洞见', type: 'Ti' },
        { text: '温暖、会照顾人', type: 'Fe' },
        { text: '有态度、有灵魂', type: 'Fi' },
      ],
    },
    {
      id: 32,
      question: '若用一句话形容你的思维，你更贴？',
      options: [
        { text: '到处连线、可能性感强', type: 'Ne' },
        { text: '抓主线、预感强', type: 'Ni' },
        { text: '活在当下、反应快', type: 'Se' },
        { text: '稳、细、可复用经验', type: 'Si' },
      ],
    },
  ],
  disclaimer:
    '本测试为认知倾向自测，非临床或资质测评；八维与 MBTI 类型需结合专业学习与自我观察，结果仅供自我探索参考。',
};

export function computeJung8Result(answers) {
  const counts = { Ne: 0, Ni: 0, Se: 0, Si: 0, Te: 0, Ti: 0, Fe: 0, Fi: 0 };
  const { questions, pointsPerAnswer, typeLabels, typeByDominantAux, functionHints } = jung8Test;
  questions.forEach((q, idx) => {
    const optionIndex = answers[idx];
    if (typeof optionIndex !== 'number') return;
    const opt = q.options[optionIndex];
    if (opt && opt.type && counts[opt.type] !== undefined) {
      counts[opt.type] += pointsPerAnswer;
    }
  });
  const sorted = JUNG8_ORDER.map((key) => ({
    key,
    label: typeLabels[key],
    score: counts[key],
  })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return JUNG8_ORDER.indexOf(a.key) - JUNG8_ORDER.indexOf(b.key);
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
  paragraphs.push(jung8Test.disclaimer);
  return {
    counts,
    sortedScores: sortedWithBar,
    topTwoLabel,
    typeGuess,
    resultTitle: '荣格八维排序',
    resultDescription: paragraphs.join('\n\n'),
  };
}
