/**
 * 微信原生小程序 page.json 不支持 enableShareAppMessage / enableShareTimeline
 * （见 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html）
 * 分享请在页面 JS 中实现 Page.onShareAppMessage / Page.onShareTimeline。
 */
const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');

function walkJsonFiles(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkJsonFiles(full, out);
    else if (name.endsWith('.json')) out.push(full);
  }
}

const files = [];
walkJsonFiles(pagesDir, files);

const KEYS = ['enableShareAppMessage', 'enableShareTimeline'];

for (const file of files) {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (e) {
    continue;
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error('Invalid JSON:', file, e.message);
    process.exitCode = 1;
    continue;
  }
  let changed = false;
  for (const k of KEYS) {
    if (Object.prototype.hasOwnProperty.call(data, k)) {
      delete data[k];
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log('removed invalid share keys:', path.relative(path.join(__dirname, '..'), file));
  }
}
