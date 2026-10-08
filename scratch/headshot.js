const { chromium, devices } = require('playwright');
const base = process.argv[2];
const outDir = process.argv[3];
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['Desktop Chrome'], locale: 'de-DE' });
  const page = await ctx.newPage();
  await page.goto(`${base}/de/`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  const hdr = page.locator('header');
  await hdr.screenshot({ path: `${outDir}/dark.png` });
  await page.evaluate(() => { localStorage.setItem('theme','light'); document.body.classList.add('light-theme'); });
  await page.reload({ waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  await page.locator('header').screenshot({ path: `${outDir}/light.png` });
  // Arabic dark
  await page.goto(`${base}/ar/`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  await page.locator('header').screenshot({ path: `${outDir}/ar-dark.png` });
  await browser.close();
})();
