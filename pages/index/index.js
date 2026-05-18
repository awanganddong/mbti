import { fetchTestCatalog } from '../../services/appBackend';

const TABS = ['恋爱', '性格', '职场', '趣味', '深度', '更多'];
const HOME_EXCLUDED_IDS = ['hidden'];

/** 与 assets/mbti/test-catalog.json 对齐；接口未更新时仍保证小程序内可发现 */
const BUNDLED_TEST_ENTRIES = [
  {
    id: 'holland',
    title: '霍兰德职业兴趣量表',
    description: 'RIASEC 六型职业兴趣 · 简版自测参考',
    tags: ['职场', '职业', '心理'],
    subCards: [
      {
        id: 'holland-30',
        title: '霍兰德职业兴趣（30题）',
        description: '约 8 分钟完成 · 兴趣码参考',
        url: '/pages/holland/index',
        estimatedMinutes: 8,
        badge: '专业',
      },
    ],
  },
  {
    id: 'eq',
    title: '情商测试',
    description: '情绪觉察、共情与沟通自测 · 趣味参考',
    tags: ['趣味', '情商', '社交'],
    subCards: [
      {
        id: 'eq-20',
        title: '情商（20题）',
        description: '约 5 分钟完成 · 得分与参考解读',
        url: '/pages/eq/index',
        estimatedMinutes: 5,
        badge: 'NEW',
      },
    ],
  },
  {
    id: 'attachment',
    title: '成人依恋类型测试',
    description: '安全 / 焦虑 / 回避 / 恐惧-回避 · 亲密关系参考',
    tags: ['性格', '依恋', '心理'],
    subCards: [
      {
        id: 'attachment-23',
        title: '成人依恋（23题）',
        description: '约 6 分钟完成 · 主导类型参考',
        url: '/pages/attachment/index',
        estimatedMinutes: 6,
        badge: 'NEW',
      },
    ],
  },
  {
    id: 'avpd',
    title: '回避型人格障碍倾向筛查',
    description: '社交回避与敏感维度 · 简版自测（非诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'avpd-18',
        title: '回避倾向（18题）',
        description: '约 5 分钟 · 得分参考',
        url: '/pages/avpd/index',
        estimatedMinutes: 5,
        badge: '筛查',
      },
    ],
  },
  {
    id: 'bpd',
    title: '边缘型人格障碍倾向筛查',
    description: '情绪与人际敏感维度 · 9题简测（非诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'bpd-9',
        title: '边缘倾向（9题）',
        description: '约 3 分钟 · 得分参考',
        url: '/pages/bpd/index',
        estimatedMinutes: 3,
        badge: '筛查',
      },
    ],
  },
  {
    id: 'ocpd',
    title: '强迫性人格倾向筛查',
    description: '完美主义、秩序与控制维度 · 简版自测（非诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'ocpd-16',
        title: '强迫倾向（16题）',
        description: '约 5 分钟 · 得分参考',
        url: '/pages/ocpd/index',
        estimatedMinutes: 5,
        badge: '筛查',
      },
    ],
  },
  {
    id: 'ppd',
    title: '偏执型人格障碍倾向筛查',
    description: '多疑与敌意揣测维度 · 简版自测（非诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'ppd-15',
        title: '偏执倾向（15题）',
        description: '约 5 分钟 · 得分参考',
        url: '/pages/ppd/index',
        estimatedMinutes: 5,
        badge: '筛查',
      },
    ],
  },
  {
    id: 'dpd',
    title: '依赖型人格障碍倾向筛查',
    description: '依附与独处困难维度 · 简版自测（非诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'dpd-15',
        title: '依赖倾向（15题）',
        description: '约 5 分钟 · 得分参考',
        url: '/pages/dpd/index',
        estimatedMinutes: 5,
        badge: '筛查',
      },
    ],
  },
  {
    id: 'depd',
    title: '抑郁型人格障碍倾向筛查',
    description: '悲观基调与自我苛责维度 · 简版自测（非诊断、非抑郁症诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'depd-15',
        title: '抑郁型人格倾向（15题）',
        description: '约 5 分钟 · 得分参考',
        url: '/pages/depd/index',
        estimatedMinutes: 5,
        badge: '筛查',
      },
    ],
  },
  {
    id: 'hpd',
    title: '表演型人格障碍倾向筛查',
    description: '寻求关注与戏剧化表达维度 · 简版自测（非诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'hpd-15',
        title: '表演倾向（15题）',
        description: '约 5 分钟 · 得分参考',
        url: '/pages/hpd/index',
        estimatedMinutes: 5,
        badge: '筛查',
      },
    ],
  },
  {
    id: 'npd',
    title: '自恋型人格障碍倾向筛查',
    description: '特权感与共情困难维度 · 简版自测（非诊断）',
    tags: ['性格', '心理', '自测'],
    subCards: [
      {
        id: 'npd-15',
        title: '自恋倾向（15题）',
        description: '约 5 分钟 · 得分参考',
        url: '/pages/npd/index',
        estimatedMinutes: 5,
        badge: '筛查',
      },
    ],
  },
];

const TEST_PRESENTATION = {
  love: {
    badgeText: 'TOP1',
    badgeStyle: 'top',
    title: '你的恋爱人格是什么类型？',
    tags: ['恋爱', '关系'],
    info: '30题 · 约6分钟',
    people: '482.7W',
    art: 'love',
  },
  sbti: {
    badgeText: 'TOP2',
    badgeStyle: 'top',
    title: 'SBTI 沙雕人格测试',
    tags: ['恶搞', '趣味'],
    info: '十五维 · 约8分钟',
    people: '热门',
    art: 'sbti',
  },
  jung8: {
    badgeText: 'TOP3',
    badgeStyle: 'top',
    title: '你隐藏的性格特质是什么？',
    tags: ['深度', '盘点'],
    info: '32题 · 约8分钟',
    people: '315.6W',
    art: 'jung8',
  },
};

function safeStr(v) {
  return String(v || '').trim();
}

function safeArr(v) {
  return Array.isArray(v) ? v : [];
}

function getPrimarySubCard(card) {
  const subs = safeArr(card && card.subCards);
  return subs.length > 0 ? subs[0] : null;
}

function inferCategory(card) {
  const id = safeStr(card && card.id);
  const tags = safeArr(card && card.tags);
  if (id === 'holland') return '职场';
  if (tags.includes('职场')) return '职场';
  if (id === 'eq') return '趣味';
  if (id === 'sbti') return '趣味';
  if (id === 'hidden') return '趣味';
  if (id === 'mbti' || id === 'jung8') return 'MBTI';
  if (id === 'attachment') return '性格';
  if (id === 'avpd') return '性格';
  if (id === 'bpd') return '性格';
  if (id === 'ocpd') return '性格';
  if (id === 'ppd' || id === 'dpd' || id === 'depd' || id === 'hpd' || id === 'npd') return '性格';
  if (tags.includes('恋爱') || tags.includes('情感') || tags.includes('三观')) return '恋爱';
  if (tags.includes('健康') || tags.includes('科普') || tags.includes('性取向') || tags.includes('情绪')) return '深度';
  if (tags.includes('趣味') || tags.includes('恶搞') || tags.includes('社交')) return '趣味';
  return '更多';
}

function pickRandomN(list, n, excludeIds) {
  const ex = new Set(safeArr(excludeIds));
  const arr = safeArr(list).filter((x) => x && !ex.has(x.id));
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = tmp;
  }
  return shuffled.slice(0, n);
}

Page({
  data: {
    tabs: TABS,
    activeTab: '恋爱',
    loading: true,
    errorText: '',

    hero: {
      kicker: '全网热门 TOP1',
      titlePrefix: '测测你的',
      titleAccent: '恋爱脑',
      titleSuffix: '指数',
      subtitle: '30题 · 趣味自测 · 看看你是不是恋爱脑',
      floatingMain: '上头指数',
      floatingSub: '趣味参考',
      floatingAltA: '甜系',
      floatingAltB: '盐系',
      ctaText: '开始测试',
      peopleText: '482.7W 人已测过',
      url: '/pages/love/index',
    },

    hotCards: [],
    guessCards: [],
  },

  onLoad() {
    this.loadCatalog();
  },

  onShow() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onPullDownRefresh() {
    this.loadCatalog().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  loadCatalog() {
    this.setData({ loading: true, errorText: '' });
    return fetchTestCatalog()
      .then((list) => {
        this._catalog = Array.isArray(list) ? list : [];
        this.rebuildSections();
        this.setData({ loading: false });
      })
      .catch(() => {
        this._catalog = [];
        this.rebuildSections();
        this.setData({
          loading: false,
          errorText: '数据加载失败，点击重试',
        });
      });
  },

  rebuildSections() {
    const raw = Array.isArray(this._catalog) ? this._catalog : [];
    const homeExcluded = new Set(HOME_EXCLUDED_IDS);
    const seen = new Set();
    raw.forEach((c) => {
      const id = safeStr(c && c.id);
      if (id && !homeExcluded.has(id)) seen.add(id);
    });
    const list = raw.filter((c) => !homeExcluded.has(safeStr(c && c.id)));
    BUNDLED_TEST_ENTRIES.forEach((entry) => {
      const id = safeStr(entry && entry.id);
      if (!id || seen.has(id)) return;
      list.push(entry);
      seen.add(id);
    });

    const byId = {};
    list.forEach((c) => {
      const id = safeStr(c && c.id);
      if (id) byId[id] = c;
    });

    const hotOrder = ['love', 'sbti', 'jung8'];
    const hotCards = hotOrder.map((id) => {
      const card = byId[id];
      const sub = getPrimarySubCard(card);
      const preset = TEST_PRESENTATION[id] || {};
      return {
        id,
        url: (sub && sub.url) ? sub.url : '',
        badgeText: preset.badgeText || '',
        badgeStyle: preset.badgeStyle || '',
        title: preset.title || safeStr(card && card.title) || '未命名测试',
        tags: preset.tags || safeArr(card && card.tags),
        info: preset.info || (sub && sub.description ? safeStr(sub.description) : ''),
        people: preset.people || '',
        peopleText: preset.peopleText || '',
        peopleLabel: preset.peopleText || `${preset.people || ''} 人测过`,
        art: preset.art || id,
      };
    }).filter((x) => x && x.url);

    const allCards = list.map((card) => {
      const id = safeStr(card && card.id);
      const sub = getPrimarySubCard(card);
      const cat = inferCategory(card);
      return {
        id,
        category: cat,
        title: safeStr(card && card.title),
        description: safeStr(card && card.description),
        tags: safeArr(card && card.tags),
        url: sub && sub.url ? sub.url : '',
        minutes: sub && sub.estimatedMinutes ? Number(sub.estimatedMinutes) : 0,
        badge: sub && sub.badge ? safeStr(sub.badge) : '',
      };
    }).filter((x) => x.url);

    this._allCards = allCards;
    this.setData({ hotCards });
    this.refreshGuessCards();
  },

  refreshGuessCards() {
    const tab = this.data.activeTab;
    const hotIds = safeArr(this.data.hotCards).map((x) => x.id);
    let pool = Array.isArray(this._allCards) ? this._allCards : [];
    if (tab === '恋爱' || tab === '性格' || tab === '职场' || tab === '趣味' || tab === '深度') {
      pool = pool.filter((x) => x.category === tab);
    }

    const picked = pickRandomN(pool, 3, hotIds);
    const guessCards = picked.map((x) => ({
      ...x,
      pill: x.category === '深度' ? '深度' : (x.category === '恋爱' ? '恋爱' : (x.category === 'MBTI' ? 'MBTI' : (x.category === '趣味' ? '趣味' : (x.category === '职场' ? '职场' : (x.category === '性格' ? '性格' : '更多'))))),
      isNew: x.badge === 'NEW',
      art: x.id,
      ctaMeta: x.minutes ? `约 ${x.minutes} 分钟 · 报告可存` : '报告可保存',
    }));
    this.setData({ guessCards });
  },

  setTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (!tab) return;
    this.setData({ activeTab: tab });
    this.refreshGuessCards();
  },

  handleHeroStart() {
    const url = this.data.hero && this.data.hero.url ? this.data.hero.url : '';
    if (!url) return;
    wx.navigateTo({ url });
  },

  handleNavigate(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;

    const tabUrls = ['/pages/index/index', '/pages/hidden/index', '/pages/me/index'];
    if (tabUrls.includes(url)) {
      wx.switchTab({ url });
      return;
    }
    wx.navigateTo({ url });
  },

  handleShuffleGuess() {
    this.refreshGuessCards();
  },

  onShareAppMessage() {
    return {
      title: '人格探索：选择一个测试开始',
      path: '/pages/index/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '人格探索',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

})
