const puppeteer = require("puppeteer");
const looksSame = require("looks-same");

/**
 *
 * @param  {Buffer}          reference Referred image buffer
 * @param  {Buffer}          current   Current image buffer
 * @param  {string}          color     diff highlight color
 * @return {Promise<Buffer>} Diff image buffer
 */
const generateDiff = (reference, current, color) => {
  return new Promise((resolve, reject) => {
    looksSame.createDiff(
      {
        reference,
        current,
        highlightColor: color,
      },
      (error, screenDiff) => {
        if (error) {
          reject(
            `Diff generation error. Perhaps the specified color "${color}" is invalid.`
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
 * @param {number} duration
 */
const sleep = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

/**
 *
 * @param  {string}  url Target url for screenshot
 * @return {buffer} screenshot image buffer
 */
const screenshot = async (url, wait) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await sleep(wait);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  return screenshot;
};

/**
 *
 * @param {string}   referenceUrl referenced url
 * @param {string?}  currentUrl   current url
 * @param {options} options      { color: string, wait: number, reference?: bool, current?: bool }
 * @return {buffer} diff image buffer
 */
const lib = async (referenceUrl, currentUrl, options) => {
  const duration = Math.max(0, options.delay || 0);
  const [referenceImage, currentImage] = await Promise.all([
    referenceUrl && screenshot(referenceUrl, duration),
    currentUrl && screenshot(currentUrl, duration),
  ]);

  if (!currentUrl) {
    return referenceImage;
  } else {
    return await generateDiff(referenceImage, currentImage, options.color);
  }
};

module.exports = lib;
