import { fetchMbtiTypeGroups } from '../../../services/appBackend';

const { SHARE_IMG, registerShareMenu, shareTimelineTip } = require('../../../utils/resultShare');

const EPITHET_BY_TYPE = {
  INTJ: '建筑师',
  INTP: '逻辑学家',
  ENTJ: '指挥官',
  ENTP: '辩论家',
  INFJ: '提倡者',
  INFP: '调停者',
  ENFJ: '主人公',
  ENFP: '竞选者',
  ISTJ: '物流师',
  ISFJ: '守卫者',
  ESTJ: '总经理',
  ESFJ: '执政官',
  ISTP: '鉴赏家',
  ISFP: '探险家',
  ESTP: '企业家',
  ESFP: '表演者',
};

function clipText(s, maxLen) {
  const t = String(s || '').trim();
  if (!t) return '';
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen)}…`;
}

Page({
  data: {
    type: '',
    epithet: '',
    description: '',
  },

  onLoad(options) {
    registerShareMenu();
    const raw = options && options.type ? String(options.type) : '';
    const type = decodeURIComponent(raw).toUpperCase().slice(0, 4);
    if (!type || type.length !== 4) {
      wx.showToast({ title: '结果无效', icon: 'none' });
      return;
    }
    const fallbackEpithet = EPITHET_BY_TYPE[type] || '';
    this.setData({
      type,
      epithet: fallbackEpithet,
      description: '',
    });
    this.enrichFromServer(type);
  },

  enrichFromServer(type) {
    fetchMbtiTypeGroups()
      .then((groups) => {
        const row = Array.isArray(groups) ? groups.find((g) => g && g.type === type) : null;
        if (!row) return;
        const epithet = row.epithet || EPITHET_BY_TYPE[type] || '';
        const description = clipText(row.description || row.nameDescription || '', 420);
        this.setData({ epithet, description });
      })
      .catch(() => {
        // keep fallback epithet
      });
  },

  onShareAppMessage() {
    const type = String(this.data.type || '').trim();
    const eph = String(this.data.epithet || '').trim();
    const title = type ? `我的 MBTI：${type}${eph ? ' · ' + eph : ''}` : 'MBTI 测试结果';
    const path = type
      ? `/pages/test/result/index?type=${encodeURIComponent(type)}`
      : '/pages/test/index';
    return {
      title,
      path,
      imageUrl: SHARE_IMG,
    };
  },

  onShareTimeline() {
    const type = String(this.data.type || '').trim();
    return {
      title: type ? `MBTI：${type}` : 'MBTI 测试结果',
      query: type ? `type=${encodeURIComponent(type)}` : '',
      imageUrl: SHARE_IMG,
    };
  },

  shareTimelineTip,

  goRetest() {
    wx.redirectTo({ url: '/pages/test/index' });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  goHistory() {
    wx.navigateTo({ url: '/pages/test/result/history/index' });
  },
});
