const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const out = path.join(process.env.TEMP || '.', 'hero-shots');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(90000);

  async function shot(url, name) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);
    await page.evaluate(() => {
      document.querySelector('.intro-loader')?.remove();
      document.documentElement.classList.add('intro-done');
      document.body.classList.add('intro-done');
      document.body.style.overflow = '';
    });
    await page.waitForTimeout(600);
    const file = path.join(out, name);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1440, height: 780 } });
    console.log('saved', file);
  }

  await shot('http://127.0.0.1:3001/', 'home.png');
  await shot('http://127.0.0.1:3001/about', 'about.png');
  await shot('http://127.0.0.1:3001/services', 'services.png');
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
