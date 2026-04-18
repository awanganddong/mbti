/**
 * 喜欢程度测试：想着你心里那个人作答（趣味自测）
 */

export const likeLevelTest = {
  title: '喜欢程度测试',
  description: '测一测你对 TA 的喜欢有多深',
  questionCount: 20,
  maxScore: 60,
  instruction: '请全程想着「你心里想测的那个人」：可以是暗恋对象、暧昧对象或恋人。按真实感受选，没有标准答案。',
  questions: [
    {
      id: 1,
      question: '想到 TA，你更常出现哪种状态？',
      options: [
        { text: '偶尔闪过，很快忘了', score: 0 },
        { text: '会微笑一下，继续做事', score: 1 },
        { text: '会停下手头事想一会儿', score: 2 },
        { text: '一天能想很多遍', score: 3 },
      ],
    },
    {
      id: 2,
      question: '看到 TA 发消息，你通常？',
      options: [
        { text: '和其他消息差不多', score: 0 },
        { text: '会开心一下', score: 1 },
        { text: '会尽快回复', score: 2 },
        { text: '心跳加快、反复看措辞', score: 3 },
      ],
    },
    {
      id: 3,
      question: '你会主动找 TA 聊天吗？',
      options: [
        { text: '很少主动', score: 0 },
        { text: '偶尔主动', score: 1 },
        { text: '经常主动', score: 2 },
        { text: '忍不住想分享一切', score: 3 },
      ],
    },
    {
      id: 4,
      question: 'TA 和异性说笑，你会？',
      options: [
        { text: '完全无感', score: 0 },
        { text: '有一点点酸', score: 1 },
        { text: '会介意、会多看几眼', score: 2 },
        { text: '醋意很明显', score: 3 },
      ],
    },
    {
      id: 5,
      question: '你愿意为 TA 调整自己的安排吗？',
      options: [
        { text: '基本不会', score: 0 },
        { text: '偶尔可以', score: 1 },
        { text: '经常愿意', score: 2 },
        { text: 'TA 优先，其他靠边', score: 3 },
      ],
    },
    {
      id: 6,
      question: '你会翻 TA 的社交动态/朋友圈吗？',
      options: [
        { text: '几乎不', score: 0 },
        { text: '偶尔看看', score: 1 },
        { text: '经常看', score: 2 },
        { text: '反复看、考古旧动态', score: 3 },
      ],
    },
    {
      id: 7,
      question: '和 TA 单独相处时，你更？',
      options: [
        { text: '很自然，像普通朋友', score: 0 },
        { text: '略紧张，但能聊', score: 1 },
        { text: '明显紧张、在意形象', score: 2 },
        { text: '脑子容易空白、心跳很快', score: 3 },
      ],
    },
    {
      id: 8,
      question: '你会想象和 TA 的未来吗？',
      options: [
        { text: '几乎不会', score: 0 },
        { text: '偶尔一闪而过', score: 1 },
        { text: '会认真想几种可能', score: 2 },
        { text: '经常幻想、连细节都有', score: 3 },
      ],
    },
    {
      id: 9,
      question: 'TA 心情不好时，你会？',
      options: [
        { text: '知道就好，不太额外投入', score: 0 },
        { text: '礼貌关心一下', score: 1 },
        { text: '会多问几句', score: 2 },
        { text: '很揪心或比 TA 还难受', score: 3 },
      ],
    },
    {
      id: 10,
      question: '你愿意让朋友知道你在意 TA 吗？',
      options: [
        { text: '完全不想让人知道', score: 0 },
        { text: '只跟死党说', score: 1 },
        { text: '愿意小范围公开', score: 2 },
        { text: '恨不得全世界知道', score: 3 },
      ],
    },
    {
      id: 11,
      question: 'TA 夸你一句，你会？',
      options: [
        { text: '礼貌说谢谢', score: 0 },
        { text: '开心一小会儿', score: 1 },
        { text: '会反复回味', score: 2 },
        { text: '能开心一整天', score: 3 },
      ],
    },
    {
      id: 12,
      question: '你会记住 TA 随口说的小细节吗？',
      options: [
        { text: '不太记', score: 0 },
        { text: '记一点', score: 1 },
        { text: '会刻意记', score: 2 },
        { text: '像备忘录一样清楚', score: 3 },
      ],
    },
    {
      id: 13,
      question: '若一天完全联系不上 TA，你会？',
      options: [
        { text: '不太在意', score: 0 },
        { text: '有点惦记', score: 1 },
        { text: '会焦虑、多试几种方式', score: 2 },
        { text: '坐立难安、脑补很多', score: 3 },
      ],
    },
    {
      id: 14,
      question: '你愿意为 TA 学新东西或改变习惯吗？',
      options: [
        { text: '不太愿意', score: 0 },
        { text: '小改变可以', score: 1 },
        { text: '愿意尝试', score: 2 },
        { text: '很愿意，只要 TA 开心', score: 3 },
      ],
    },
    {
      id: 15,
      question: '看到和 TA 有关的东西（歌、地点、物品），你会？',
      options: [
        { text: '没什么联想', score: 0 },
        { text: '会想起 TA 一下', score: 1 },
        { text: '会截图或标记', score: 2 },
        { text: '立刻想发给 TA', score: 3 },
      ],
    },
    {
      id: 16,
      question: '你对「肢体距离」的期待？',
      options: [
        { text: '保持礼貌距离就好', score: 0 },
        { text: '不排斥偶尔靠近', score: 1 },
        { text: '期待牵手、靠肩一类', score: 2 },
        { text: '经常想贴贴、抱抱', score: 3 },
      ],
    },
    {
      id: 17,
      question: '你会因为 TA 一句话而失眠或睡不着吗？',
      options: [
        { text: '不会', score: 0 },
        { text: '偶尔', score: 1 },
        { text: '有时会', score: 2 },
        { text: '经常，脑子停不下来', score: 3 },
      ],
    },
    {
      id: 18,
      question: '若 TA 和别人在一起了，你更？',
      options: [
        { text: '祝福就好', score: 0 },
        { text: '有点失落', score: 1 },
        { text: '很难过、需要时间缓', score: 2 },
        { text: '很难接受、会痛很久', score: 3 },
      ],
    },
    {
      id: 19,
      question: '用一句话，你对 TA 的感觉更接近？',
      options: [
        { text: '普通朋友或没什么特别', score: 0 },
        { text: '挺有好感的', score: 1 },
        { text: '会心动', score: 2 },
        { text: '很喜欢或满脑子都是', score: 3 },
      ],
    },
    {
      id: 20,
      question: '若现在就能表白且对方一定认真听，你会？',
      options: [
        { text: '再等等、观察', score: 0 },
        { text: '会紧张，但可能说', score: 1 },
        { text: '很想说清楚自己的心意', score: 2 },
        { text: '恨不得马上让 TA 知道', score: 3 },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 15,
      title: '浅浅好感',
      description:
        '你对 TA 更多是好感或欣赏，心动浓度还不算高。你可能还在观察、慢热，或本身比较理性。若你想更进一步，可以多创造自然相处的机会，不必急着定义关系。',
    },
    {
      min: 16,
      max: 28,
      title: '有点心动',
      description:
        '你已经明显在意 TA：会主动、会惦记，也会有点小醋与小期待。你可能处在「友达以上」的阶段。下一步可以是更坦诚的互动与表达，让对方感受到你的认真。',
    },
    {
      min: 29,
      max: 40,
      title: '明显喜欢',
      description:
        '你对 TA 的喜欢已经很难藏：会想念、会幻想、会优先、会情绪波动。你很可能已经认真了。记得也照顾好自己的节奏，喜欢很甜，但不要把自己弄丢。',
    },
    {
      min: 41,
      max: 52,
      title: '很喜欢 · 上头期',
      description:
        '你对 TA 的喜欢浓度很高：容易吃醋、反复琢磨、强烈想靠近。你可能正处在「上头期」。提醒：再喜欢也要保留自我与边界；合适的回应与双向奔赴，才更长久。',
    },
    {
      min: 53,
      max: 60,
      title: '喜欢到藏不住',
      description:
        '你的喜欢几乎满格：脑子里常是 TA，情绪很容易被牵动。你可能已经「陷进去了」。记得确认对方是否同样认真；也记得睡眠、朋友与生活圈，别让喜欢变成自我消耗。',
    },
  ],
  disclaimer: '本测试为趣味自测，不能代表对方的心意。涉及真实表白与关系决策，请结合现实沟通与尊重彼此感受。',
};
