const puppeteer = require("puppeteer");
const looksSame = require("looks-same");

const generateDiff = (screenshot1, screenshot2) => {
  return new Promise((resolve, reject) => {
    looksSame.createDiff(
      {
        reference: screenshot1,
        current: screenshot2,
        highlightColor: "#ff00ff",
      },
      (error, screenDiff) => {
        if (error) {
          reject(error);
        } else {
          resolve(screenDiff);
        }
      }
    );
  });
};

module.exports = async (url1, url2) => {
  const [browser1, browser2] = await Promise.all([
    puppeteer.launch(),
    puppeteer.launch(),
  ]);

  const [page1, page2] = await Promise.all([
    browser1.newPage(),
    browser2.newPage(),
  ]);

  const [screenshot1, screenshot2] = await Promise.all([
    page1.goto(url1).then(() => page1.screenshot({ fullPage: true })),
    page2.goto(url2).then(() => page2.screenshot({ fullPage: true })),
  ]);

  const [, , screenDiff] = await Promise.all([
    browser1.close(),
    browser2.close(),
    generateDiff(screenshot1, screenshot2),
  ]);
  return screenDiff;
};
