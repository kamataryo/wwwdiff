const puppeteer = require("puppeteer");
const looksSame = require("looks-same");

const generateDiff = (screenshot1, screenshot2, options) => {
  return new Promise((resolve, reject) => {
    looksSame.createDiff(
      {
        reference: screenshot1,
        current: screenshot2,
        highlightColor: options.color || "#ff00ff",
      },
      (error, screenDiff) => {
        if (error) {
          reject(
            `Diff generation error. Perhaps the color "${options.color}" is invalid.`
          );
        } else {
          resolve(screenDiff);
        }
      }
    );
  });
};

const url2screenshot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  return screenshot;
};

module.exports = async (url1, url2, options) => {
  const [screenshot1, screenshot2] = await Promise.all([
    url2screenshot(url1),
    url2screenshot(url2),
  ]);
  return await generateDiff(screenshot1, screenshot2, options);
};
