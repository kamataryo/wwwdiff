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
 * @param  {string}  url Target url for screenshot
 * @return {buffer} screenshot image buffer
 */
const screenshot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  return screenshot;
};

/**
 *
 * @param {string}   referenceUrl referenced url
 * @param {string?}  currentUrl   current url
 * @param {options} options      { color: string, reference?: bool, current?: bool }
 * @return {buffer} diff image buffer
 */
const lib = async (referenceUrl, currentUrl, options) => {
  const [referenceImage, currentImage] = await Promise.all([
    referenceUrl && screenshot(referenceUrl),
    currentUrl && screenshot(currentUrl),
  ]);

  if (!currentUrl) {
    return referenceImage;
  } else {
    return await generateDiff(referenceImage, currentImage, options.color);
  }
};

module.exports = lib;
