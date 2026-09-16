import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const htmlPath = resolve(root, 'index.html');
const html = readFileSync(htmlPath, 'utf8');
const required = [
  'id="game"',
  'id="missionBar"',
  'id="scUpgrade"',
  'function showUpgrade()',
  'function chooseUpgrade(index)',
  'document.addEventListener(\'visibilitychange\'',
  "url('assets/tanksbattle-keyart.jpg')",
  'src="assets/tank-badge.png"',
];
const missing = required.filter((needle) => !html.includes(needle));
const assets = ['assets/tanksbattle-keyart.jpg', 'assets/tank-badge.png'];
const missingAssets = assets.filter((file) => {
  try { return statSync(resolve(root, file)).size === 0; }
  catch { return true; }
});
if (missing.length || missingAssets.length) {
  console.error(JSON.stringify({ missing, missingAssets }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, htmlBytes: Buffer.byteLength(html), assets }, null, 2));
