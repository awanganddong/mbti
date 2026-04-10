function splitByDotNewline(text) {
  if (!text) return [];
  return text.split(/\.\n+/g).map(function (s) {
    return s.endsWith(".") ? s : s + ".";
  });
}

module.exports = { splitByDotNewline };
