Page({
  data: {
    history: []
  },

  onLoad() {
    this.loadHistory();
  },

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    const history = wx.getStorageSync('testHistory') || [];
    this.setData({
      history
    });
  },

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  },

  viewResult(e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/test/result/index?type=${type}`
    });
  },

  goTest() {
    wx.navigateTo({
      url: '/pages/test/index'
    });
  }
})