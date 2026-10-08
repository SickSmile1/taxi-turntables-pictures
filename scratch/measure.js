const { chromium, devices } = require('playwright');
const base = process.argv[2];
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['Desktop Chrome'], locale: 'de-DE' });
  const page = await ctx.newPage();
  await page.goto(`${base}/de/`, { waitUntil: 'load' });
  const boxes = await page.evaluate(() => {
    const g = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) };
    };
    return {
      logo: g('header a[href="#top"]'),
      nav: g('nav.desktop-nav'),
      lang: g('.desktop-lang'),
      theme: g('.theme-toggle-btn'),
      phone: g('.phone-btn'),
      navLinks: [...document.querySelectorAll('nav.desktop-nav a, nav.desktop-nav button')].map(a => {
        const r = a.getBoundingClientRect();
        return { text: a.textContent.trim(), x: Math.round(r.x), w: Math.round(r.width) };
      }),
    };
  });
  console.log(JSON.stringify(boxes, null, 2));
  await browser.close();
})();
