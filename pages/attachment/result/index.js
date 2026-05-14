const ORDER = ['S', 'A', 'D', 'F'];

const TYPE_INFO = {
  S: {
    label: '安全型',
    desc: '你较能在亲密关系中信任对方，也能表达需求与边界。冲突后愿意修复与沟通，整体依恋较平衡。',
  },
  A: {
    label: '焦虑型',
    desc: '你较敏感于距离与回应，容易担心被忽视或抛弃。练习自我安抚、明确表达需求、与伴侣约定沟通节奏会有帮助。',
  },
  D: {
    label: '回避型',
    desc: '你倾向保持独立与情绪距离，亲密感太强时可能想退缩。尝试小步增加脆弱表达与回应，有助于关系更深。',
  },
  F: {
    label: '恐惧-回避型',
    desc: '你常同时渴望亲密又害怕受伤，容易在靠近与疏远间摇摆。稳定的小步信任与安全对话，比「一次谈清」更适合你。',
  },
};

const { SHARE_IMG, registerShareMenu, shareTimelineTip } = require('../../../utils/resultShare');

Page({
  data: {
    code: '',
    typeLabel: '',
    typeDesc: '',
    scoreRows: [],
  },

  onLoad() {
    registerShareMenu();
    const pack = wx.getStorageSync('attachmentLastResultView') || {};
    const code = String(pack.code || '').trim().toUpperCase();
    if (!code || !TYPE_INFO[code]) {
      wx.showToast({ title: '暂无结果', icon: 'none' });
      return;
    }
    const scores = pack.scores && typeof pack.scores === 'object' ? pack.scores : {};
    const nums = ORDER.map((k) => Number(scores[k]) || 0);
    const max = Math.max(1, ...nums);
    const scoreRows = ORDER.map((k) => ({
      key: k,
      label: `${k} · ${TYPE_INFO[k].label}`,
      count: Number(scores[k]) || 0,
      pct: Math.round(((Number(scores[k]) || 0) / max) * 100),
    }));
    const info = TYPE_INFO[code];
    this.setData({
      code,
      typeLabel: info.label,
      typeDesc: info.desc,
      scoreRows,
    });
  },

  onShareAppMessage() {
    const t = String(this.data.typeLabel || '').trim() || '成人依恋自测';
    return {
      title: `我的依恋类型：${t}`,
      path: '/pages/attachment/index',
      imageUrl: SHARE_IMG,
    };
  },

  onShareTimeline() {
    const t = String(this.data.typeLabel || '').trim() || '成人依恋自测';
    return {
      title: `依恋类型：${t}`,
      query: '',
      imageUrl: SHARE_IMG,
    };
  },

  shareTimelineTip,

  goRetest() {
    wx.redirectTo({ url: '/pages/attachment/index' });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },
});
