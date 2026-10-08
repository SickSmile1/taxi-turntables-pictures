const { chromium, devices } = require('playwright');

const base = process.argv[2] || 'http://localhost:3000';
const outDir = process.argv[3] || '/tmp/opencode/shots';
const desktop = { ...devices['Desktop Chrome'] };
const mobile = { ...devices['Pixel 5'] };

async function shot(page, name) {
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false });
  console.log('saved', name);
}

async function load(page, path, theme) {
  await page.goto(`${base}${path}`, { waitUntil: 'load' });
  if (theme === 'light') {
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.body.classList.add('light-theme');
    });
    await page.reload({ waitUntil: 'load' });
  } else {
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload({ waitUntil: 'load' });
  }
}

(async () => {
  const browser = await chromium.launch();
  for (const [tag, device] of [['desktop', desktop], ['mobile', mobile]]) {
    const ctx = await browser.newContext({
      ...device,
      locale: 'de-DE',
    });
    const page = await ctx.newPage();
    await page.goto(`${base}/de/`, { waitUntil: 'load' });
    await shot(page, `${tag}-dark-de`);
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.body.classList.add('light-theme');
    });
    await page.reload({ waitUntil: 'load' });
    await shot(page, `${tag}-light-de`);
    await page.goto(`${base}/ar/`, { waitUntil: 'load' });
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload({ waitUntil: 'load' });
    await shot(page, `${tag}-dark-ar`);
    await ctx.close();
  }
  await browser.close();
})();
