const RIASEC = ['R', 'I', 'A', 'S', 'E', 'C'];

const LETTER = {
  R: { name: 'R 实际型', tip: '偏好具体任务、工具操作与实务技能。' },
  I: { name: 'I 研究型', tip: '偏好分析、实验与理论探究。' },
  A: { name: 'A 艺术型', tip: '偏好创意表达、审美与开放性工作。' },
  S: { name: 'S 社会型', tip: '偏好人际互动、辅导与服务他人。' },
  E: { name: 'E 企业型', tip: '偏好影响他人、领导与商业目标达成。' },
  C: { name: 'C 常规型', tip: '偏好规则、数据与结构化流程。' },
};

function safeStr(v) {
  return String(v || '').trim();
}

const { SHARE_IMG, registerShareMenu, shareTimelineTip } = require('../../../utils/resultShare');

Page({
  data: {
    code: '',
    scoreRows: [],
    topTips: '',
  },

  onLoad() {
    registerShareMenu();
    const pack = wx.getStorageSync('hollandLastResultView') || {};
    const code = safeStr(pack.code).toUpperCase();
    if (!code || code.length !== 3) {
      wx.showToast({ title: '暂无结果', icon: 'none' });
      return;
    }
    const scores = pack.scores && typeof pack.scores === 'object' ? pack.scores : {};
    const nums = RIASEC.map((k) => Number(scores[k]) || 0);
    const max = Math.max(1, ...nums);
    const scoreRows = RIASEC.map((k) => ({
      key: k,
      label: LETTER[k] ? LETTER[k].name : k,
      count: Number(scores[k]) || 0,
      pct: Math.round(((Number(scores[k]) || 0) / max) * 100),
    }));
    const topTips = code
      .split('')
      .map((ch) => (LETTER[ch] ? `${LETTER[ch].name}：${LETTER[ch].tip}` : ''))
      .filter(Boolean)
      .join('\n\n');
    this.setData({ code, scoreRows, topTips });
  },

  onShareAppMessage() {
    const c = String(this.data.code || '').trim().toUpperCase() || '霍兰德';
    return {
      title: `我的霍兰德兴趣码：${c}`,
      path: '/pages/holland/index',
      imageUrl: SHARE_IMG,
    };
  },

  onShareTimeline() {
    const c = String(this.data.code || '').trim().toUpperCase() || '霍兰德';
    return {
      title: `霍兰德兴趣码 ${c}`,
      query: '',
      imageUrl: SHARE_IMG,
    };
  },

  shareTimelineTip,

  goRetest() {
    wx.redirectTo({ url: '/pages/holland/index' });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },
});
