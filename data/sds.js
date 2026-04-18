/**
 * Zung 氏抑郁自评量表（SDS）
 * 请根据最近一周的实际感受作答。
 * 反向计分题：正向表述症状越少见，抑郁倾向越高（见各题 reverse 标记）。
 */

export const sdsTest = {
  title: '抑郁自评量表（SDS）',
  description: 'Zung 氏 SDS · 20 题',
  questionCount: 20,
  /** 粗分理论范围 */
  rawMin: 20,
  rawMax: 80,
  /** 标准分 = 粗分 × 1.25，理论范围 */
  standardMin: 25,
  standardMax: 100,
  instruction: '下面有二十条文字，请仔细阅读每一条，根据最近一星期以内的实际感觉，在适当的选项上选择。',
  optionLabels: ['没有或很少时间', '小部分时间', '相当多时间', '绝大部分或全部时间'],
  questions: [
    { id: 1, question: '我感到情绪沮丧，郁闷。', reverse: false },
    { id: 2, question: '我感到早晨心情最好。', reverse: true },
    { id: 3, question: '我要哭或想哭。', reverse: false },
    { id: 4, question: '我夜间睡眠不好。', reverse: false },
    { id: 5, question: '我吃饭像平时一样多。', reverse: true },
    { id: 6, question: '我与异性密切接触时和以往一样感到愉快。', reverse: true },
    { id: 7, question: '我感到体重减轻。', reverse: false },
    { id: 8, question: '我有便秘的苦恼。', reverse: false },
    { id: 9, question: '我心跳比平时快。', reverse: false },
    { id: 10, question: '我无故感到疲劳。', reverse: false },
    { id: 11, question: '我的头脑像往常一样清楚。', reverse: true },
    { id: 12, question: '我做事情像平时一样不感到困难。', reverse: true },
    { id: 13, question: '我坐卧不安，难以保持平静。', reverse: false },
    { id: 14, question: '我对未来感到有希望。', reverse: true },
    { id: 15, question: '我比平时更容易激怒。', reverse: false },
    { id: 16, question: '我觉得决定什么事很容易。', reverse: true },
    { id: 17, question: '我感到自己是有用的和不可缺少的人。', reverse: true },
    { id: 18, question: '我的生活很有意义。', reverse: true },
    { id: 19, question: '假若我死了别人会过得更好。', reverse: false },
    { id: 20, question: '我仍然喜爱自己平时喜爱的东西。', reverse: true },
  ],
  /** 按标准分（抑郁指数）划分 */
  results: [
    {
      min: 25,
      max: 49,
      title: '正常范围',
      description:
        '按 SDS 常模，你的标准分处于通常认为的无明显抑郁症状范围。这仅反映近一周自评结果，不能代表人格或长期状态。若仍感到情绪困扰，可关注睡眠、压力与人际支持，必要时咨询专业人士。',
    },
    {
      min: 50,
      max: 59,
      title: '轻度抑郁症状',
      description:
        '按 SDS 划分，标准分提示可能存在轻度抑郁症状，表现为情绪低落、兴趣减退、疲劳或睡眠食欲变化等。建议重视自我调节与作息，与信任的人沟通；若症状持续或加重，请前往医院精神心理科或心理咨询机构评估。',
    },
    {
      min: 60,
      max: 69,
      title: '中度抑郁症状',
      description:
        '按 SDS 划分，标准分提示抑郁症状可能已达到中度，对日常生活影响往往更明显。强烈建议尽快预约精神心理科或临床心理专业评估，结合面谈与必要检查，制定干预方案。请勿仅依赖自测量表自我诊断。',
    },
    {
      min: 70,
      max: 100,
      title: '重度抑郁症状',
      description:
        '按 SDS 划分，标准分提示抑郁症状可能较重，务必尽快就医，由精神心理科或相关专科医生评估与处理。若出现自伤、自杀想法或计划，请立即联系家人、拨打当地心理危机热线或急救电话，前往最近医疗机构。',
    },
  ],
  disclaimer:
    '本测试为抑郁症状自评筛查工具，结果仅供参考，不能替代医生诊断，也不构成医疗建议。如有不适请及时寻求专业帮助。',
};

/**
 * @param {number[]} answers 每题选项索引 0–3
 * @returns {{ raw: number, standard: number, result: typeof sdsTest.results[0] }}
 */
export function computeSdsScores(answers) {
  let raw = 0;
  sdsTest.questions.forEach((q, idx) => {
    const optIdx = answers[idx];
    if (typeof optIdx !== 'number' || optIdx < 0 || optIdx > 3) return;
    const v = q.reverse ? 4 - optIdx : optIdx + 1;
    raw += v;
  });
  const standard = Math.round(raw * 1.25 * 10) / 10;
  const standardInt = Math.round(raw * 1.25);
  const result =
    sdsTest.results.find((r) => standardInt >= r.min && standardInt <= r.max) ||
    sdsTest.results[sdsTest.results.length - 1];
  return { raw, standard, standardInt, result };
}
