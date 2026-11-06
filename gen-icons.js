const sharp = require('sharp');
const path = require('path');

const DIR = __dirname;

// 普通版：沿用原 favicon 设计（深蓝圆角底 + 青色人像 + 白色箭头）
const normalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0B1E3F"/>
  <circle cx="27" cy="25" r="10" fill="#22D3EE"/>
  <path d="M11 52c2-12 10-18 16-18s14 6 16 18z" fill="#22D3EE"/>
  <path d="M42 14l9 9-9 9" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// maskable / apple 版：满幅无圆角底，内容缩到 80% 安全区（系统自行裁剪圆角）
const safeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0B1E3F"/>
  <g transform="translate(32 32) scale(0.78) translate(-32 -32)">
    <circle cx="27" cy="25" r="10" fill="#22D3EE"/>
    <path d="M11 52c2-12 10-18 16-18s14 6 16 18z" fill="#22D3EE"/>
    <path d="M42 14l9 9-9 9" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

async function render(svg, name, size) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(DIR, name));
  console.log(name, size + 'x' + size);
}

(async () => {
  await render(normalSvg, 'icon-192.png', 192);
  await render(normalSvg, 'icon-512.png', 512);
  await render(safeSvg, 'icon-maskable-512.png', 512);
  await render(safeSvg, 'apple-touch-icon.png', 180);
  await render(normalSvg, 'favicon-32.png', 32);
})();
