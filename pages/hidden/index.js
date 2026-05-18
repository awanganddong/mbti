import { analyzeHiddenPersona, isRemoteImageURL } from '../../services/hiddenBackend';

const SAMPLE_IMAGE = '/public/images/mbti.jpg';

const PERSONAS = [
  {
    title: '温柔疏离的治愈系',
    impression: '你给人的第一印象是',
    summary: '你看起来安静而温柔，内心却比别人更细腻敏感。你不轻易靠近别人，但一旦信任，就会非常真诚。',
    traits: ['细腻敏感', '观察力强', '慢热被动', '内心柔软', '理性克制', '容易共情'],
    stats: [
      { label: '情感深度', value: 92, icon: '💗' },
      { label: '社交能量', value: 48, icon: '🌙' },
      { label: '神秘指数', value: 78, icon: '⭐' },
    ],
    axes: [
      { left: '外向', right: '内向', leftValue: 35, rightValue: 65 },
      { left: '感性', right: '理性', leftValue: 72, rightValue: 28 },
      { left: '随性', right: '自律', leftValue: 40, rightValue: 60 },
      { left: '敏感', right: '坚强', leftValue: 80, rightValue: 20 },
    ],
    note: '你不是不想被理解，只是还没遇到值得你放心交出心事的人。',
  },
  {
    title: '清醒浪漫的月光系',
    impression: '你藏起来的真实气质是',
    summary: '你很会照顾情绪，也很擅长把边界放在温柔里。你愿意浪漫，但不会失去判断。',
    traits: ['温柔清醒', '边界感强', '表达含蓄', '浪漫务实', '直觉准确', '不爱将就'],
    stats: [
      { label: '情绪感知', value: 88, icon: '💞' },
      { label: '关系边界', value: 76, icon: '🌙' },
      { label: '心动雷达', value: 69, icon: '✨' },
    ],
    axes: [
      { left: '主动', right: '被动', leftValue: 46, rightValue: 54 },
      { left: '感性', right: '理性', leftValue: 61, rightValue: 39 },
      { left: '热烈', right: '克制', leftValue: 42, rightValue: 58 },
      { left: '共情', right: '决断', leftValue: 73, rightValue: 27 },
    ],
    note: '你看似好说话，其实心里一直有一把很准的尺。',
  },
  {
    title: '反差感很强的甜酷系',
    impression: '别人眼里的你更像',
    summary: '你外在轻松好相处，真正重要的事却会自己扛。你有可爱的一面，也有很强的自我保护。',
    traits: ['外柔内刚', '反差明显', '独立要强', '偶尔嘴硬', '审美在线', '行动果断'],
    stats: [
      { label: '反差魅力', value: 86, icon: '💎' },
      { label: '独立指数', value: 81, icon: '⚡' },
      { label: '亲和能量', value: 64, icon: '🌸' },
    ],
    axes: [
      { left: '外向', right: '内向', leftValue: 52, rightValue: 48 },
      { left: '感性', right: '理性', leftValue: 55, rightValue: 45 },
      { left: '依赖', right: '独立', leftValue: 24, rightValue: 76 },
      { left: '柔软', right: '锋利', leftValue: 63, rightValue: 37 },
    ],
    note: '你不是冷，只是习惯先确认对方是否真的值得靠近。',
  },
];

Page({
  data: {
    step: 'home',
    photoPath: '',
    description: '',
    descCount: 0,
    sampleImage: SAMPLE_IMAGE,
    analyzing: false,
    result: null,
    isDemo: false,
    tabs: ['性格解析', '情感模式', '人际关系', '成长建议'],
    activeTab: '性格解析',
    prompts: [
      '最近总是不想回消息',
      '感觉没人真正懂我',
      '不知道为什么总想逃避社交',
      '最近很累，情绪很低落',
      '对未来感到迷茫',
    ],
  },

  onShow() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
  },

  choosePhoto() {
    const done = (path) => {
      if (!path) return;
      this.setData({ photoPath: path });
    };

    if (wx.chooseMedia) {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const item = res && res.tempFiles && res.tempFiles[0];
          done(item && item.tempFilePath);
        },
      });
      return;
    }

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => done(res && res.tempFilePaths && res.tempFilePaths[0]),
    });
  },

  useSample() {
    this.setData({
      step: 'result',
      photoPath: SAMPLE_IMAGE,
      description: '',
      descCount: 0,
      result: PERSONAS[0],
      activeTab: '性格解析',
      isDemo: true,
    });
  },

  updateDescription(e) {
    const description = e.detail.value || '';
    this.setData({ description, descCount: description.length });
  },

  fillPrompt(e) {
    const text = e.currentTarget.dataset.text || '';
    this.setData({ description: text, descCount: text.length });
  },

  goInput() {
    this.setData({ step: 'input' });
  },

  startAnalyze() {
    if (!this.data.photoPath) {
      wx.showToast({ title: '先上传一张照片', icon: 'none' });
      return;
    }
    this.setData({ analyzing: true });
    analyzeHiddenPersona({
      description: this.data.description,
      filePath: this.data.photoPath,
      imageUrl: isRemoteImageURL(this.data.photoPath) ? this.data.photoPath : '',
      hasPhoto: !!this.data.photoPath,
    })
      .then((result) => {
        if (!result || !result.title) {
          throw new Error('AI 未返回有效结果');
        }
        this.setData({
          step: 'result',
          analyzing: false,
          result,
          isDemo: false,
        });
      })
      .catch((err) => {
        this.setData({ analyzing: false, isDemo: false });
        wx.showToast({
          title: err && err.message ? err.message : '分析失败，请稍后重试',
          icon: 'none',
        });
      });
  },

  setDetailTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (!tab) return;
    this.setData({ activeTab: tab });
  },

  showDetail() {
    this.setData({ step: 'detail' });
  },

  backToResult() {
    this.setData({ step: 'result' });
  },

  saveCard() {
    wx.showToast({ title: '结果已生成', icon: 'success' });
  },

  reset() {
    this.setData({
      step: 'home',
      photoPath: '',
      description: '',
      descCount: 0,
      result: null,
      activeTab: '性格解析',
      isDemo: false,
    });
  },

  onShareAppMessage() {
    return {
      title: 'AI Vibe Scanner：测测你的隐藏人格',
      path: '/pages/hidden/index',
      imageUrl: '/public/images/mbti.jpg',
    };
  },

  onShareTimeline() {
    return {
      title: 'AI Vibe Scanner：你的隐藏人格',
      query: '',
      imageUrl: '/public/images/mbti.jpg',
    };
  },
});
