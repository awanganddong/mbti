/**
 * 与原版 SBTI TYPE_LIBRARY 中 code / cn 对应，用于结果页与图片人格代号统一展示
 */
/** @type {Record<string, string>} */
export const sbtiTypeCn = {
  CTRL: "拿捏者",
  "ATM-er": "送钱者",
  "Dior-s": "屌丝",
  BOSS: "领导者",
  "THAN-K": "感恩者",
  "OH-NO": "哦不人",
  GOGO: "行者",
  SEXY: "尤物",
  "LOVE-R": "多情者",
  MUM: "妈妈",
  FAKE: "伪人",
  OJBK: "无所谓人",
  MALO: "吗喽",
  "JOKE-R": "小丑",
  "WOC!": "握草人",
  "THIN-K": "思考者",
  SHIT: "愤世者",
  ZZZZ: "装死者",
  POOR: "贫困者",
  MONK: "僧人",
  IMSB: "傻者",
  SOLO: "孤儿",
  FUCK: "草者",
  DEAD: "死者",
  IMFW: "废物",
  HHHH: "傻乐者",
  DRUNK: "酒鬼",
};

export function sbtiTypeLine(code) {
  if (!code) return "";
  const cn = sbtiTypeCn[code];
  return cn ? `${code}（${cn}）` : String(code);
}
