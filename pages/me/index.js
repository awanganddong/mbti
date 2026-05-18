import { tarotLogin } from '../../services/tarotBackend';

Page({
  data: {
    isLoggedIn: false,
    avatarUrl: '',
    nickName: '未登录',
    tarotHistoryCount: 0,
    mbtiHistoryCount: 0,
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const userProfile = wx.getStorageSync('userProfile') || null;
    const tarotHistory = wx.getStorageSync('tarotHistory') || [];
    const mbtiHistory = wx.getStorageSync('testHistory') || [];
    const isLoggedIn = !!(userProfile && userProfile.avatarUrl && userProfile.nickName);
    this.setData({
      isLoggedIn,
      avatarUrl: isLoggedIn ? userProfile.avatarUrl : '',
      nickName: isLoggedIn ? userProfile.nickName : '未登录',
      tarotHistoryCount: tarotHistory.length,
      mbtiHistoryCount: mbtiHistory.length,
    });
  },

  onShareAppMessage() {
    return {
      title: '我的：查看测试与抽牌记录',
      path: '/pages/me/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    return {
      title: '我的',
      query: '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  authorizeLogin() {
    wx.getUserProfile({
      desc: '用于展示头像昵称与提供登录体验',
      success: (res) => {
        const userInfo = res && res.userInfo ? res.userInfo : null;
        if (!userInfo) return;
        const profile = {
          avatarUrl: userInfo.avatarUrl || '',
          nickName: userInfo.nickName || '',
          gender: userInfo.gender || 0,
          city: userInfo.city || '',
          province: userInfo.province || '',
          country: userInfo.country || ''
        };
        wx.setStorageSync('userProfile', profile);
        this.loadData();

        tarotLogin(profile)
          .then(() => {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
          })
          .catch((err) => {
            wx.showToast({
              title: err && err.message ? err.message : '后端登录失败',
              icon: 'none'
            });
          });
      },
      fail: () => {
        wx.showToast({
          title: '未授权',
          icon: 'none'
        });
      }
    });
  },

  logout() {
    wx.removeStorageSync('userProfile');
    wx.removeStorageSync('tarotUid');
    wx.removeStorageSync('userScore');
    this.loadData();
    wx.showToast({
      title: '已退出',
      icon: 'success'
    });
  },

  goTarot() {
    wx.navigateTo({
      url: '/pages/tarot/index'
    });
  },

  goMbtiHistory() {
    wx.navigateTo({
      url: '/pages/test/result/history/index'
    });
  },

  goHidden() {
    wx.switchTab({
      url: '/pages/hidden/index'
    });
  },

  clearTarotHistory() {
    wx.showModal({
      title: '清除记录',
      content: '确定清除塔罗抽牌记录吗？',
      confirmText: '清除',
      success: (res) => {
        if (!res.confirm) return;
        wx.removeStorageSync('tarotHistory');
        this.loadData();
        wx.showToast({
          title: '已清除',
          icon: 'success'
        });
      }
    });
  },
});
