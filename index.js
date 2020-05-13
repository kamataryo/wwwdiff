const puppeteer = require("puppeteer");
const looksSame = require("looks-same");

const debugInMem = {};

const debugStart = (message, id) => {
  const now = Date.now();
  debugInMem[id] = { start: now, message };
  process.stderr.write(`[START] ${message}\n`);
};

const debugEnd = (id) => {
  if (debugInMem[id] === void 0) {
    return;
  }
  const now = Date.now();
  debugInMem[id].end = now;
  const duration = now - debugInMem[id].start;
  process.stderr.write(`[END] (${duration}ms) ${debugInMem[id].message}\n`);
};

const debugSummary = () => {
  const eventTimes = Object.values(debugInMem).reduce(
    (prev, { start, end }) => {
      prev.push(start, end);
      return prev;
    },
    []
  );
  const min = Math.min(...eventTimes);
  const max = Math.max(...eventTimes);
  process.stderr.write(
    `[SUMMARY] (${max - min}ms) for ${eventTimes.length / 2} events.\n`
  );
};

/**
 *
 * @param  {Buffer}          reference Referred image buffer
 * @param  {Buffer}          current   Current image buffer
 * @return {Promise<Buffer>} Diff image buffer
 */
const generateDiff = (reference, current, options) => {
  const { color } = options;
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
 * @param  {{duration: number, verbose: boolean, width?: number }} options
 * @return {buffer} screenshot image buffer
 */
const screenshot = async (url, options) => {
  const { delay, width } = options;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  width !== void 0 && (await page.setViewport({ width, height: 1 }));
  await page.goto(url);
  await sleep(delay);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  return screenshot;
};

/**
 *
 * @param {string}   referenceUrl referenced url
 * @param {string?}  currentUrl   current url
 * @param {object}   options      { color: string, duration: number, width?: number, verbose?: bool, reference?: bool, current?: bool }
 * @return {buffer} diff image buffer
 */
const w3diff = async (referenceUrl, currentUrl, options) => {
  const delay = Math.max(0, options.delay || 0);
  const width =
    typeof options.width === "number" ? Math.max(1, options.width) : void 0;
  const verbose = !!options.verbose;

  verbose && debugStart(`Taking screenshot(s) URL.`, 1);
  const [referenceImage, currentImage] = await Promise.all([
    referenceUrl && screenshot(referenceUrl, { delay, width }),
    currentUrl && screenshot(currentUrl, { delay, width }),
  ]);
  verbose && debugEnd(1);

  let output;
  if (!currentUrl) {
    output = referenceImage;
  } else {
    const { color } = options;

    verbose && debugStart(`Creating a diff image.`, 2);
    output = await generateDiff(referenceImage, currentImage, {
      color,
    });
    verbose && debugEnd(2);
  }
  verbose && debugSummary();
  return output;
};

module.exports = w3diff;
