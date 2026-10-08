const { chromium, devices } = require('playwright');
const base = process.argv[2];
const outDir = process.argv[3];
const mobile = { ...devices['Pixel 5'] };
(async () => {
  const browser = await chromium.launch();
  for (const [tag, device] of [['desktop', { ...devices['Desktop Chrome'] }], ['mobile', mobile]]) {
    const ctx = await browser.newContext({ ...device, locale: 'de-DE' });
    const page = await ctx.newPage();
    await page.goto(`${base}/de/`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outDir}/${tag}-dark-de.png` });
    await page.evaluate(() => { localStorage.setItem('theme','light'); document.body.classList.add('light-theme'); });
    await page.reload({ waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outDir}/${tag}-light-de.png` });
    await ctx.close();
  }
  await browser.close();
})();
