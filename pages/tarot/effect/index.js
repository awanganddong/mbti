import { fetchTarotDeck } from '../../../services/appBackend';
import { drawTarotFromDeck } from '../../../services/tarotDeck';

Page({
  data: {
    question: '',
    stage: 'idle',
    drawId: '',
    result: null,
    isFlipped: false,
    glowOn: false,
    haloOn: false,
    particles: [],
    showTapHint: true,
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });

    const question = options && options.q ? decodeURIComponent(options.q) : '';
    this.setData({
      question: question || ''
    });

    wx.setNavigationBarTitle({
      title: '抽卡'
    });

    fetchTarotDeck()
      .then((deck) => {
        this._tarotDeck = deck;
      })
      .catch(() => {});
  },

  buildParticleStyle(p) {
    const left = p.left;
    const top = p.top;
    const width = p.width;
    const height = p.height;
    const rotate = p.rotate;
    const opacity = p.opacity;
    const duration = p.duration;
    const delay = p.delay;
    return `left:${left};top:${top};width:${width}rpx;height:${height}rpx;opacity:${opacity};transform:translate(-50%,-50%) rotate(${rotate}deg) scaleX(1.9);transition:left ${duration}ms cubic-bezier(0.08, 0.82, 0.2, 1) ${delay}ms, top ${duration}ms cubic-bezier(0.08, 0.82, 0.2, 1) ${delay}ms, opacity ${duration}ms ease-out ${delay}ms;`;
  },

  generateParticles() {
    const count = 18;
    const particles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.floor(Math.random() * 360);
      const distance = 240 + Math.floor(Math.random() * 320);
      const rad = (angle * Math.PI) / 180;
      const dx = Math.round(Math.cos(rad) * distance);
      const dy = Math.round(Math.sin(rad) * distance);
      const width = 38 + Math.floor(Math.random() * 40);
      const height = 6 + Math.floor(Math.random() * 8);
      const duration = 520 + Math.floor(Math.random() * 420);
      const delay = Math.floor(Math.random() * 120);
      const p0 = {
        id: `${Date.now()}-${i}`,
        left: '50%',
        top: '50%',
        width,
        height,
        rotate: angle,
        opacity: 1,
        duration,
        delay,
        dx,
        dy,
      };
      particles.push({
        ...p0,
        style: this.buildParticleStyle(p0),
      });
    }
    return particles;
  },

  activateParticles(particles) {
    const next = particles.map(p => {
      const p1 = {
        ...p,
        left: `calc(50% + ${p.dx}rpx)`,
        top: `calc(50% + ${p.dy}rpx)`,
        opacity: 0,
      };
      return {
        ...p1,
        style: this.buildParticleStyle(p1),
      };
    });
    this.setData({
      particles: next
    });
  },

  handleCardTap() {
    if (this.data.stage !== 'idle') return;

    const uid = Number(wx.getStorageSync('tarotUid') || 0);
    const profile = wx.getStorageSync('userProfile') || null;
    const isLoggedIn = uid > 0 && !!(profile && profile.avatarUrl && profile.nickName);
    if (!isLoggedIn) {
      wx.showModal({
        title: '请先登录',
        content: '登录后才可以抽卡并保存你的记录。',
        confirmText: '去登录',
        success: (res) => {
          if (res && res.confirm) {
            wx.switchTab({
              url: '/pages/me/index'
            });
          }
        }
      });
      return;
    }

    if (!String(this.data.question || '').trim()) {
      wx.showToast({
        title: '请先输入问题',
        icon: 'none'
      });
      return;
    }

    this.setData({
      showTapHint: false
    });

    this.setData({
      stage: 'animating',
      isFlipped: true,
      glowOn: true,
      haloOn: false,
      drawId: '',
      result: null,
      particles: [],
    });

    setTimeout(() => {
      const question = String(this.data.question || '').trim();
		const deck = Array.isArray(this._tarotDeck) ? this._tarotDeck : [];
		const drawn = drawTarotFromDeck(deck);
		if (!drawn) {
			wx.showToast({
				title: '牌库加载失败',
				icon: 'none'
			});
			this.setData({
				stage: 'idle',
				showTapHint: true,
				isFlipped: false,
				glowOn: false,
				haloOn: false,
				particles: [],
				result: null,
				drawId: ''
			});
			return;
		}
      const timestamp = Date.now();
      const history = wx.getStorageSync('tarotHistory') || [];
      history.unshift({
        timestamp,
        question,
        ...drawn,
      });
      wx.setStorageSync('tarotHistory', history);

      const particles = this.generateParticles();
      this.setData({
        haloOn: true,
        drawId: String(timestamp),
        result: {
          question,
          cardTitle: drawn.cardTitle,
          orientation: drawn.orientation,
          keywords: drawn.keywords,
          sections: drawn.sections || [],
        },
        particles,
      });

      setTimeout(() => {
        this.activateParticles(particles);
      }, 24);

      wx.setNavigationBarTitle({
        title: '抽卡结果'
      });
    }, 400);

    setTimeout(() => {
      this.setData({
        stage: 'done'
      });
    }, 1100);
  },

  onShareAppMessage() {
    const drawId = this.data.drawId;
    const title = this.data.result ? `我的塔罗牌：${this.data.result.cardTitle}（${this.data.result.orientation}）` : '塔罗抽卡';
    return {
      title,
      path: drawId ? `/pages/tarot/result/index?drawId=${drawId}` : '/pages/tarot/index',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  onShareTimeline() {
    const drawId = this.data.drawId;
    const title = this.data.result ? `塔罗牌：${this.data.result.cardTitle}（${this.data.result.orientation}）` : '塔罗抽卡';
    return {
      title,
      query: drawId ? `drawId=${drawId}` : '',
      imageUrl: '/public/images/mbti.jpg'
    };
  },

  openResultPage() {
    if (!this.data.drawId) return;
    wx.navigateTo({
      url: `/pages/tarot/result/index?drawId=${this.data.drawId}&ai=1`
    });
  },

  goTarotTab() {
    wx.switchTab({
      url: '/pages/tarot/index'
    });
  },

  drawAgain() {
    wx.switchTab({
      url: '/pages/tarot/index'
    });
  },
});
