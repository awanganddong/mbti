export function drawTarotFromDeck(deck) {
  const list = Array.isArray(deck) ? deck : [];
  if (list.length === 0) {
    return null;
  }
  const idx = Math.floor(Math.random() * list.length);
  const card = list[idx];
  const isReversed = Math.random() < 0.5;
  const orientation = isReversed ? '逆位' : '正位';
  const meaning = String(isReversed ? card.reversed : card.upright);
  const keywords = String(card.keywords || '');
  const sections = [
    { title: '我看到的', text: meaning },
    ...(keywords ? [{ title: '关键词', text: keywords }] : [])
  ];
  return {
    cardId: String(card.id || ''),
    cardTitle: String(card.title || ''),
    keywords,
    orientation,
    meaning,
    sections,
  };
}

