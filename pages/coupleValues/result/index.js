import { fetchQuizConfig } from '../../../services/quizBackend';
import { computeCoupleMatch, sumVectors, vectorToPercent } from '../../../services/quizCompute';

const { SHARE_IMG, shareTimelineTip } = require('../../../utils/resultShare');

const STORAGE_SELF = 'coupleValuesAnswersSelf';
const STORAGE_PARTNER = 'coupleValuesAnswersPartner';

function matchNarrative(overall) {
  if (overall >= 80) {
    return '你们在选项与五维画像上整体较为接近，沟通成本可能相对较低；仍建议在具体事件上持续对齐期待。';
  }
  if (overall >= 60) {
    return '你们有不错的一致性，也在部分维度存在差异；差异不等于不合，关键是能否尊重并协商。';
  }
  if (overall >= 40) {
    return '你们在若干议题上差异明显，这很常见；更需要坦诚沟通与边界共识，而非强行一致。';
  }
  return '结果显示差异较大，可作为「讨论清单」使用：了解彼此从何处来，比追求分数更重要。';
}

Page({
  data: {
    mode: 'self',
    /** self */
    profileRows: [],
    /** match */
    overall: 0,
    choiceAvg: 0,
    dimAvg: 0,
    dimensionRows: [],
    narrative: '',
    disclaimerText: '',
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    const mode = options.mode === 'match' ? 'match' : 'self';
    fetchQuizConfig('coupleValues')
      .then((cfg) => {
        this._quizConfig = cfg;
        this.setData({ disclaimerText: String(cfg.disclaimer || '') });

        if (mode === 'match') {
          const a = wx.getStorageSync(STORAGE_SELF);
          const b = wx.getStorageSync(STORAGE_PARTNER);
          if (!a || !b || !Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0 || a.length !== b.length) {
            wx.showModal({
              title: '提示',
              content: '需要两份完整答卷才能计算匹配度。请先完成「我自己」，再完成「另一半」。',
              showCancel: false,
              success: () => {
                wx.redirectTo({ url: '/pages/coupleValues/index' });
              }
            });
            return;
          }
          const m = computeCoupleMatch(cfg, a, b);
          const dimensionRows = m.dimDetails.map((d) => ({
            label: d.label,
            similarity: d.similarity,
            you: m.percentA[d.key],
            ta: m.percentB[d.key],
          }));
          this.setData({
            mode: 'match',
            overall: m.overall,
            choiceAvg: m.choiceAvg,
            dimAvg: m.dimAvg,
            dimensionRows,
            narrative: matchNarrative(m.overall),
          });
          return;
        }

        const a = wx.getStorageSync(STORAGE_SELF);
        if (!a || !Array.isArray(a) || a.length === 0) {
          wx.redirectTo({ url: '/pages/coupleValues/index' });
          return;
        }
        const sums = sumVectors(cfg, a);
        const pct = vectorToPercent(sums);
        const dims = cfg && Array.isArray(cfg.dimensions) ? cfg.dimensions : [];
        const profileRows = dims.map((d) => ({
          label: d.label,
          key: d.key,
          value: pct[d.key],
        }));
        this.setData({
          mode: 'self',
          profileRows,
        });
      })
      .catch(() => {
        wx.showToast({ title: '题库加载失败', icon: 'none' });
      });
  },

  onShareAppMessage() {
    const mode = this.data.mode;
    const title =
      mode === 'match'
        ? `三观匹配度：${this.data.overall} 分（情侣三观测试）`
        : '我的三观画像（情侣三观测试）';
    const path = mode === 'match' ? '/pages/coupleValues/result/index?mode=match' : '/pages/coupleValues/index';
    return {
      title,
      path,
      imageUrl: SHARE_IMG,
    };
  },

  onShareTimeline() {
    const mode = this.data.mode;
    const title =
      mode === 'match'
        ? `三观匹配 ${this.data.overall} 分`
        : '情侣三观测试';
    const query = mode === 'match' ? 'mode=match' : '';
    return {
      title,
      query,
      imageUrl: SHARE_IMG,
    };
  },

  shareTimelineTip,

  goPartnerQuiz() {
    wx.navigateTo({
      url: '/pages/coupleValues/index?round=partner'
    });
  },

  resetAll() {
    wx.removeStorageSync(STORAGE_SELF);
    wx.removeStorageSync(STORAGE_PARTNER);
    wx.redirectTo({
      url: '/pages/coupleValues/index'
    });
  },

  goHome() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  },
});
