/**
 * 与原版 SBTI TYPE_IMAGES 文件名一致；请将对应 png/jpg 放在本地目录：
 * 分包 packageSbti 内 pages/sbti/image/<文件名>
 */
const BASE = "/packageSbti/pages/sbti/image";

/** @type {Record<string, string>} */
export const sbtiTypeImages = {
  IMSB: `${BASE}/IMSB.png`,
  BOSS: `${BASE}/BOSS.png`,
  MUM: `${BASE}/MUM.png`,
  FAKE: `${BASE}/FAKE.png`,
  "Dior-s": `${BASE}/Dior-s.jpg`,
  DEAD: `${BASE}/DEAD.png`,
  ZZZZ: `${BASE}/ZZZZ.png`,
  GOGO: `${BASE}/GOGO.png`,
  FUCK: `${BASE}/FUCK.png`,
  CTRL: `${BASE}/CTRL.png`,
  HHHH: `${BASE}/HHHH.png`,
  SEXY: `${BASE}/SEXY.png`,
  OJBK: `${BASE}/OJBK.png`,
  "JOKE-R": `${BASE}/JOKE-R.jpg`,
  POOR: `${BASE}/POOR.png`,
  "OH-NO": `${BASE}/OH-NO.png`,
  MONK: `${BASE}/MONK.png`,
  SHIT: `${BASE}/SHIT.png`,
  "THAN-K": `${BASE}/THAN-K.png`,
  MALO: `${BASE}/MALO.png`,
  "ATM-er": `${BASE}/ATM-er.png`,
  "THIN-K": `${BASE}/THIN-K.png`,
  SOLO: `${BASE}/SOLO.png`,
  "LOVE-R": `${BASE}/LOVE-R.png`,
  "WOC!": `${BASE}/WOC.png`,
  DRUNK: `${BASE}/DRUNK.png`,
  IMFW: `${BASE}/IMFW.png`,
};

export function sbtiTypeImageUrl(code) {
  if (!code) return "";
  return sbtiTypeImages[code] || "";
}

/** 答题页分享图：对应原版 OJBK 封面气质 */
export const sbtiShareImageUrl = sbtiTypeImages.OJBK;
