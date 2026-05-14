function formatTime(ts) {
  const n = Number(ts);
  if (!n) return '';
  const d = new Date(n);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const hh = `${d.getHours()}`.padStart(2, '0');
  const mm = `${d.getMinutes()}`.padStart(2, '0');
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

Page({
  data: {
    list: [],
  },

  onShow() {
    let raw = wx.getStorageSync('testHistory') || [];
    if (!Array.isArray(raw)) raw = [];
    const list = raw.map((x) => ({
      ...x,
      timeText: formatTime(x && x.timestamp),
    }));
    this.setData({ list });
  },

  openResult(e) {
    const type = e.currentTarget.dataset.type;
    const id = e.currentTarget.dataset.id;
    if (!type || !id) return;
    wx.navigateTo({
      url: `/pages/test/result/index?type=${encodeURIComponent(type)}&testResultId=${id}`,
    });
  },
});
