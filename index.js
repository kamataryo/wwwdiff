const puppeteer = require("puppeteer");
const looksSame = require("looks-same");

/**
 *
 * @param {Buffer}          reference  Referred image buffer
 * @param {Buffer}          current    Current image buffer
 * @param {Promise<Buffer>} options    Diff image buffer
 */
const generateDiff = (reference, current, options) => {
  return new Promise((resolve, reject) => {
    looksSame.createDiff(
      {
        reference,
        current,
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

/**
 *
 * @param {string} url Target url for screenshot
 */
const url2screenshot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  return screenshot;
};

/**
 *
 * @param {string}  url1 referenced url
 * @param {string}  url2 current url
 * @param {options} options
 */
module.exports = async (url1, url2, options) => {
  const [screenshot1, screenshot2] = await Promise.all([
    url2screenshot(url1),
    url2screenshot(url2),
  ]);
  return await generateDiff(screenshot1, screenshot2, options);
};
