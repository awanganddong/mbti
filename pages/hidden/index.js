import { analyzeHiddenPersona, isRemoteImageURL } from '../../services/hiddenBackend';

const SAMPLE_IMAGE = '/public/images/mbti.jpg';
const POSTER_CANVAS_ID = 'hiddenPosterCanvas';
const POSTER_WIDTH = 750;
const POSTER_HEIGHT = 1120;
const SHARE_IMAGE = '/public/images/mbti.jpg';
const WATERMARK_TEXT = 'AI Vibe Scanner · 隐藏人格';
const WATERMARK_SUB = '上传照片 + 描述，AI 读懂你的隐藏人格';

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

function toNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clipText(text, maxLen) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  if (!value) return '';
  return value.length > maxLen ? `${value.slice(0, maxLen)}…` : value;
}

function getImageInfo(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve('');
      return;
    }
    wx.getImageInfo({
      src,
      success: (res) => resolve(res && res.path ? res.path : src),
      fail: () => resolve(''),
    });
  });
}

function canvasToTempFilePath(page) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      canvasId: POSTER_CANVAS_ID,
      width: POSTER_WIDTH,
      height: POSTER_HEIGHT,
      destWidth: POSTER_WIDTH * 2,
      destHeight: POSTER_HEIGHT * 2,
      fileType: 'jpg',
      quality: 0.95,
      success: (res) => resolve(res.tempFilePath),
      fail: reject,
    }, page);
  });
}

function saveImageToAlbum(filePath) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath,
      success: resolve,
      fail: reject,
    });
  });
}

function setFill(ctx, value) {
  if (ctx.setFillStyle) ctx.setFillStyle(value);
  else ctx.fillStyle = value;
}

function setStroke(ctx, value) {
  if (ctx.setStrokeStyle) ctx.setStrokeStyle(value);
  else ctx.strokeStyle = value;
}

function setAlpha(ctx, value) {
  if (ctx.setGlobalAlpha) ctx.setGlobalAlpha(value);
  else ctx.globalAlpha = value;
}

function setFont(ctx, size, weight) {
  if (ctx.setFontSize) ctx.setFontSize(size);
  ctx.font = `${weight || 400} ${size}px sans-serif`;
}

function drawRoundRect(ctx, x, y, width, height, radius, fillStyle) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.arc(x + width - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
  ctx.lineTo(x + width, y + height - r);
  ctx.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5);
  ctx.lineTo(x + r, y + height);
  ctx.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
  ctx.closePath();
  if (fillStyle) setFill(ctx, fillStyle);
  ctx.fill();
}

function measureText(ctx, text) {
  if (ctx.measureText) {
    return ctx.measureText(text).width;
  }
  return String(text || '').length * 24;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const chars = String(text || '').split('');
  const lines = [];
  let line = '';
  chars.forEach((ch) => {
    const next = line + ch;
    if (measureText(ctx, next) > maxWidth && line) {
      lines.push(line);
      line = ch;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines && visible.length > 0) {
    visible[visible.length - 1] = `${visible[visible.length - 1].slice(0, -1)}…`;
  }
  visible.forEach((lineText, idx) => {
    ctx.fillText(lineText, x, y + idx * lineHeight);
  });
  return visible.length * lineHeight;
}

Page({
  data: {
    step: 'home',
    photoPath: '',
    description: '',
    descCount: 0,
    sampleImage: SAMPLE_IMAGE,
    analyzing: false,
    savingCard: false,
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
    if (this.data.savingCard) return;
    if (!this.data.result) {
      wx.showToast({ title: '暂无结果可保存', icon: 'none' });
      return;
    }
    this.setData({ savingCard: true });
    wx.showLoading({ title: '生成卡片中' });
    this.drawPoster()
      .then((filePath) => saveImageToAlbum(filePath))
      .then(() => {
        wx.hideLoading();
        this.setData({ savingCard: false });
        wx.showToast({ title: '已保存到相册', icon: 'success' });
      })
      .catch((err) => {
        wx.hideLoading();
        this.setData({ savingCard: false });
        const message = err && (err.errMsg || err.message) ? String(err.errMsg || err.message) : '';
        if (message.indexOf('auth deny') !== -1 || message.indexOf('auth denied') !== -1 || message.indexOf('authorize no response') !== -1) {
          wx.showModal({
            title: '需要相册权限',
            content: '请允许保存到相册，才能下载带水印的结果卡片。',
            confirmText: '去设置',
            success: (res) => {
              if (res.confirm && wx.openSetting) wx.openSetting();
            },
          });
          return;
        }
        wx.showToast({ title: '保存失败，请重试', icon: 'none' });
      });
  },

  drawPoster() {
    const result = this.data.result || {};
    const photoPath = this.data.photoPath || SAMPLE_IMAGE;
    const ctx = wx.createCanvasContext(POSTER_CANVAS_ID, this);
    return getImageInfo(photoPath).then((imagePath) => {
      const bg = ctx.createLinearGradient(0, 0, 0, POSTER_HEIGHT);
      bg.addColorStop(0, '#fff2fb');
      bg.addColorStop(0.48, '#f8f3ff');
      bg.addColorStop(1, '#ffffff');
      setFill(ctx, bg);
      ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);

      setAlpha(ctx, 0.5);
      setFill(ctx, '#f9a8d4');
      ctx.beginPath();
      ctx.arc(105, 105, 118, 0, Math.PI * 2);
      ctx.fill();
      setFill(ctx, '#ddd6fe');
      ctx.beginPath();
      ctx.arc(670, 80, 150, 0, Math.PI * 2);
      ctx.fill();
      setAlpha(ctx, 1);

      drawRoundRect(ctx, 52, 48, 646, 988, 42, 'rgba(255,255,255,0.86)');
      setStroke(ctx, 'rgba(249,168,212,0.42)');
      ctx.setLineWidth(2);
      ctx.stroke();

      drawRoundRect(ctx, 96, 88, 236, 50, 25, '#fff0f7');
      setFill(ctx, '#ff6fae');
      setFont(ctx, 22, 700);
      ctx.fillText('AI Vibe Scanner', 122, 122);

      setFill(ctx, '#241d3f');
      setFont(ctx, 42, 900);
      ctx.fillText('你的隐藏人格', 96, 186);

      if (imagePath) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(375, 324, 118, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(imagePath, 257, 206, 236, 236);
        ctx.restore();
      } else {
        drawRoundRect(ctx, 257, 206, 236, 236, 118, '#f7eaff');
      }

      setStroke(ctx, '#fbcfe8');
      ctx.setLineWidth(10);
      ctx.beginPath();
      ctx.arc(375, 324, 124, 0, Math.PI * 2);
      ctx.stroke();

      drawRoundRect(ctx, 286, 470, 178, 44, 22, '#f1e4ff');
      setFill(ctx, '#b37be2');
      setFont(ctx, 21, 700);
      ctx.fillText('✓ 分析完成', 318, 499);

      setFill(ctx, '#6d6687');
      setFont(ctx, 26, 500);
      const impression = clipText(result.impression || '你给人的第一印象是', 18);
      const impressionWidth = measureText(ctx, impression);
      ctx.fillText(impression, (POSTER_WIDTH - impressionWidth) / 2, 558);

      setFill(ctx, '#b77aef');
      setFont(ctx, 48, 900);
      const title = `“${clipText(result.title || '隐藏人格', 12)}”`;
      const titleWidth = Math.min(measureText(ctx, title), 620);
      ctx.fillText(title, Math.max(70, (POSTER_WIDTH - titleWidth) / 2), 622);

      setFill(ctx, '#6d6687');
      setFont(ctx, 25, 400);
      drawWrappedText(ctx, clipText(result.summary || '', 86), 106, 680, 538, 40, 3);

      const stats = Array.isArray(result.stats) ? result.stats.slice(0, 3) : [];
      const statY = 820;
      const statW = 170;
      stats.forEach((stat, idx) => {
        const x = 96 + idx * 194;
        drawRoundRect(ctx, x, statY, statW, 128, 24, '#ffffff');
        setFill(ctx, '#fff0f7');
        ctx.beginPath();
        ctx.arc(x + statW / 2, statY + 36, 28, 0, Math.PI * 2);
        ctx.fill();
        setFill(ctx, '#ff78b2');
        setFont(ctx, 30, 700);
        ctx.fillText(stat.icon || '✦', x + statW / 2 - 16, statY + 47);
        setFill(ctx, '#a57bc4');
        setFont(ctx, 21, 700);
        const label = clipText(stat.label || '', 5);
        ctx.fillText(label, x + (statW - measureText(ctx, label)) / 2, statY + 84);
        setFill(ctx, '#322953');
        setFont(ctx, 26, 900);
        const value = `${Math.max(0, Math.min(100, toNumber(stat.value, 0)))}%`;
        ctx.fillText(value, x + (statW - measureText(ctx, value)) / 2, statY + 116);
      });

      setFill(ctx, '#6f6487');
      setFont(ctx, 24, 400);
      drawWrappedText(ctx, clipText(result.note || '', 34), 106, 990, 450, 34, 2);

      setAlpha(ctx, 0.82);
      setFill(ctx, '#b77aef');
      setFont(ctx, 22, 800);
      ctx.fillText(WATERMARK_TEXT, 96, 1060);
      setFill(ctx, '#a99bbd');
      setFont(ctx, 19, 400);
      ctx.fillText(WATERMARK_SUB, 96, 1090);
      setAlpha(ctx, 1);

      return new Promise((resolve, reject) => {
        ctx.draw(false, () => {
          setTimeout(() => {
            canvasToTempFilePath(this).then(resolve).catch(reject);
          }, 120);
        });
      });
    });
  },

  shareTimelineTip() {
    wx.showToast({
      title: '点击右上角 ··· 分享到朋友圈',
      icon: 'none',
    });
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
      savingCard: false,
    });
  },

  onShareAppMessage() {
    const title = this.data.result && this.data.result.title
      ? `我的隐藏人格：${this.data.result.title}`
      : 'AI Vibe Scanner：测测你的隐藏人格';
    return {
      title,
      path: '/pages/hidden/index',
      imageUrl: SHARE_IMAGE,
    };
  },

  onShareTimeline() {
    const title = this.data.result && this.data.result.title
      ? `我的隐藏人格：${this.data.result.title}`
      : 'AI Vibe Scanner：你的隐藏人格';
    return {
      title,
      query: '',
      imageUrl: SHARE_IMAGE,
    };
  },
});
