const { chromium, devices } = require('playwright');
const base = process.argv[2];
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['Desktop Chrome'] });
  const page = await ctx.newPage();
  await page.goto(`${base}/de/`, { waitUntil: 'load' });
  const out = await page.evaluate(() => {
    const nav = document.querySelector('nav.desktop-nav');
    const outer = nav.parentElement;
    const cs = (el) => getComputedStyle(el);
    const n = cs(nav), o = cs(outer);
    return {
      nav: { display: n.display, flex: n.flex, flexGrow: n.flexGrow, width: n.width },
      outer: { display: o.display, justifyContent: o.justifyContent, gap: o.gap, maxWidth: o.maxWidth },
      outerChildren: [...outer.children].map(c => ({ tag: c.tagName, cls: c.className, w: Math.round(c.getBoundingClientRect().width) })),
    };
  });
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})();
