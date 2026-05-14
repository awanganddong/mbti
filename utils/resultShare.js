/** 测试结果页共用：开启右上角分享 + 朋友圈提示 */
const SHARE_IMG = '/public/images/mbti.jpg';

function registerShareMenu() {
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  });
}

function shareTimelineTip() {
  wx.showToast({
    title: '点击右上角 ··· 分享到朋友圈',
    icon: 'none',
  });
}

module.exports = {
  SHARE_IMG,
  registerShareMenu,
  shareTimelineTip,
};
