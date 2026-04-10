import { testCatalog } from '../../data/test-catalog';

Page({
  data: {
    testCatalog: testCatalog,
    latestResult: null,
    latestResultUrl: ''
  },

  onShow() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    const history = wx.getStorageSync('testHistory') || [];
    if (history.length === 0) {
      this.setData({
        latestResult: null,
        latestResultUrl: ''
      });
      return;
    }

    const latestResult = history[0];
    this.setData({
      latestResult,
      latestResultUrl: `/pages/test/result/index?type=${latestResult.type}&testResultId=${latestResult.timestamp}`
    });
  },

  handleSubCardTap(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;

    wx.navigateTo({
      url
    });
  },

  onShareAppMessage() {
    return {
      title: '甜甜mbti人格测试：选择一个测试开始',
      path: '/pages/index/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '甜甜mbti人格测试',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

})
