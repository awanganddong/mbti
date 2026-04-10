import { personalityClassGroups } from '../../../data/personality-class-groups';

Page({
  data: {
    personalityType: '',
    personalityDescription: '',
    personalityDescriptionParagraphs: [],
    scores: {},
    scoreRows: [],
    jungianRows: [],
    successDefinitionParagraphs: [],
    explanationOfProblemsParagraphs: [],
    solutionsParagraphs: [],
    livingHappilyTipsParagraphs: [],
    personalityData: null,
    hasFullProfile: false,
    currentTestResultId: ''
  },

  onLoad(options) {
    const type = options.type;
    const testResultId = options.testResultId;
    this.setData({
      personalityType: type,
      currentTestResultId: testResultId || ''
    });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    this.loadResult(type, testResultId);
  },

  onShareAppMessage() {
    const type = this.data.personalityType || 'ENFJ';
    const testResultId = this.data.currentTestResultId;
    return {
      title: `我的 MBTI 结果：${type}`,
      path: testResultId ? `/pages/test/result/index?type=${type}&testResultId=${testResultId}` : `/pages/test/result/index?type=${type}`,
      imageUrl: `/public/images/mbti/${type}.png`
    };
  },

  onShareTimeline() {
    const type = this.data.personalityType || 'ENFJ';
    const testResultId = this.data.currentTestResultId;
    return {
      title: `MBTI：${type}`,
      query: testResultId ? `type=${type}&testResultId=${testResultId}` : `type=${type}`,
      imageUrl: `/public/images/mbti/${type}.png`
    };
  },

  shareTimelineTip() {
    wx.showToast({
      title: '点击右上角 ··· 分享到朋友圈',
      icon: 'none'
    });
  },

  loadResult(type, testResultId) {
    // 获取历史记录
    const history = wx.getStorageSync('testHistory') || [];
    let result;
    
    if (testResultId) {
      // 根据 testResultId 查找对应的结果
      result = history.find(item => item.timestamp.toString() === testResultId);
    } else {
      // 获取最新结果
      result = history.length > 0 ? history[0] : null;
    }
    
    if (result) {
      // 使用结果中的 type，而不是 URL 参数中的 type
      const actualType = result.type;
      
      // 获取性格类型的详细数据
      const personalityData = personalityClassGroups.find(group => group.type === actualType) || null;
      
      const personalityDescription = personalityData ? personalityData.description : this.getPersonalityDescription(actualType);
      const scoreRows = this.buildScoreRows(result.scores);
      const jungianRows = personalityData && personalityData.jungianFunctionalPreference
        ? this.buildJungianRows(personalityData.jungianFunctionalPreference)
        : [];

      this.setData({
        personalityType: actualType,
        currentTestResultId: result.timestamp ? String(result.timestamp) : (testResultId || ''),
        scores: result.scores,
        scoreRows,
        jungianRows,
        personalityDescription,
        personalityDescriptionParagraphs: this.splitIntoParagraphs(personalityDescription),
        successDefinitionParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.successDefinition : ''),
        explanationOfProblemsParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.explanationOfProblems : ''),
        solutionsParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.solutions : ''),
        livingHappilyTipsParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.livingHappilyTips : ''),
        personalityData: personalityData,
        hasFullProfile: Boolean(personalityData)
      });
    } else {
      // 如果没有测试结果，创建一个默认的
      const defaultResult = {
        type: 'ENFJ',
        scores: {
          E: 5,
          I: 5,
          S: 5,
          N: 5,
          T: 5,
          F: 5,
          J: 5,
          P: 5
        }
      };
      const personalityData = personalityClassGroups.find(group => group.type === 'ENFJ') || null;
      const personalityDescription = personalityData ? personalityData.description : this.getPersonalityDescription('ENFJ');
      this.setData({
        personalityType: 'ENFJ',
        currentTestResultId: '',
        scores: defaultResult.scores,
        scoreRows: this.buildScoreRows(defaultResult.scores),
        jungianRows: personalityData && personalityData.jungianFunctionalPreference
          ? this.buildJungianRows(personalityData.jungianFunctionalPreference)
          : [],
        personalityDescription,
        personalityDescriptionParagraphs: this.splitIntoParagraphs(personalityDescription),
        successDefinitionParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.successDefinition : ''),
        explanationOfProblemsParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.explanationOfProblems : ''),
        solutionsParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.solutions : ''),
        livingHappilyTipsParagraphs: this.splitIntoParagraphs(personalityData ? personalityData.livingHappilyTips : ''),
        personalityData: personalityData,
        hasFullProfile: Boolean(personalityData)
      });
    }
  },

  buildScoreRows(scores) {
    return [
      {
        label: '外向 (E) / 内向 (I)',
        value: `${scores.E} / ${scores.I}`
      },
      {
        label: '感觉 (S) / 直觉 (N)',
        value: `${scores.S} / ${scores.N}`
      },
      {
        label: '思考 (T) / 情感 (F)',
        value: `${scores.T} / ${scores.F}`
      },
      {
        label: '判断 (J) / 感知 (P)',
        value: `${scores.J} / ${scores.P}`
      }
    ];
  },

  buildJungianRows(jungian) {
    return [
      { label: '主导功能', value: jungian.dominant },
      { label: '辅助功能', value: jungian.auxiliary },
      { label: '第三功能', value: jungian.tertiary },
      { label: '劣势功能', value: jungian.inferior }
    ];
  },

  splitIntoParagraphs(text) {
    if (!text) return [];
    const normalized = String(text).replace(/\s+/g, ' ').trim();
    if (!normalized) return [];
    const parts = [];
    let current = '';
    for (let i = 0; i < normalized.length; i++) {
      const ch = normalized[i];
      current += ch;
      if (ch === '。' || ch === '！' || ch === '？' || ch === '.' || ch === '!' || ch === '?') {
        const trimmed = current.trim();
        if (trimmed) parts.push(trimmed);
        current = '';
      }
    }
    const tail = current.trim();
    if (tail) parts.push(tail);
    return parts;
  },

  getPersonalityDescription(type) {
    const descriptions = {
      'ISTJ': ' ISTJ型的人是严肃的、有责任心的和通情达理的社会坚定分子。他们值得信赖，他们重视承诺，对他们来说，言语就是庄严的宣誓。',
      'ISFJ': ' ISFJ型的人忠诚、有奉献精神和同情心，理解别人的感受。他们意志清醒而有责任心，乐于为人所需。',
      'INFJ': ' INFJ型的人生活在思想的世界里。他们是独立的、有独创性的思想家，具有强烈的感情、坚定的原则和正直的人性。',
      'INTJ': ' INTJ型的人是完美主义者。他们强烈地要求个人自由和能力，同时在他们独创的思想中，不可动摇的信仰促使他们达到目标。',
      'ISTP': ' ISTP型的人坦率、诚实、讲求实效，他们喜欢行动而非漫谈。他们很谦逊，对于完成工作的方法有很好的理解力。',
      'ISFP': ' ISFP型的人平和、敏感，他们保持着许多强烈的个人理想和自己的价值观。他们更多地是通过行为而不是言辞表达自己深沉的情感。',
      'INFP': ' INFP型的人珍视内在和谐胜过一切。他们敏感、理想化、忠诚，对于个人价值具有一种强烈的荣誉感。',
      'INTP': ' INTP型的人是解决理性问题者。他们很有才智和条理性，以及创造才华的突出表现。',
      'ESTP': ' ESTP型的人不会焦虑，因为他们是快乐的。ESTP型的人活跃、随遇而安、天真率直。他们乐于享受现在的一切而不是为将来计划什么。',
      'ESFP': ' ESFP型的人乐意与人相处，有一种真正的生活热情。他们顽皮活泼，通过真诚和玩笑使别人感到事情更加有趣。',
      'ENFP': ' ENFP型的人充满热情和新思想。他们乐观、自然、富有创造性和自信，具有独创性的思想和对可能性的强烈感受。',
      'ENTP': ' ENTP型的人喜欢兴奋与挑战。他们热情开放、足智多谋、健谈而聪明，擅长于许多事情，不断追求增加能力和个人权力。',
      'ESTJ': ' ESTJ型的人高效率地工作，自我负责，监督他人工作，合理分配和处置资源，主次分明，井井有条；能制定和遵守规则，多喜欢在制度健全、等级分明、比较稳定的企业工作；倾向于选择较为务实的业务，以有形产品为主；喜欢工作中带有和人接触、交流的成分，但不以态度取胜；不特别强调工作的行业或兴趣，多以职业角度看待每一份工作。',
      'ESFJ': ' ESFJ型的人通过直接的行动和合作来以真实、实际的方法帮助别人。他们友好、富有同情心和责任感。',
      'ENFJ': ' ENFJ型的人热爱人类，他们认为人的感情是最重要的。他们善于表达自己的情感，对他人的感情很敏感，善于促进周边的人相互交流。',
      'ENTJ': ' ENTJ型的人是伟大的领导者和决策人。他们能轻易地看出事物具有的可能性，很高兴指导别人，使他们的想象成为现实。'
    };
    return descriptions[type] || '暂无描述信息';
  },

  goHome() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  },

  takeTestAgain() {
    wx.navigateTo({
      url: '/pages/test/index'
    });
  }
})
