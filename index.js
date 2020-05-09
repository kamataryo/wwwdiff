const puppeteer = require("puppeteer");
const looksSame = require("looks-same");
const chalk = require("chalk");

const debugInMem = {};

const debugStart = (message, id) => {
  const now = Date.now();
  debugInMem[id] = { start: now, message };
  process.stderr.write(`START: ${message}\n`);
};

const debugEnd = (id) => {
  if (debugInMem[id] === void 0) {
    return;
  }
  const now = Date.now();
  debugInMem[id].end = now;
  const duration = now - debugInMem[id].start;
  process.stderr.write(`END: (${duration}ms) ${debugInMem[id].message}\n`);
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
    `SUMMARY: (${max - min}ms) for ${eventTimes.length / 2} events.`
  );
};

/**
 *
 * @param  {Buffer}          reference Referred image buffer
 * @param  {Buffer}          current   Current image buffer
 * @return {Promise<Buffer>} Diff image buffer
 */
const generateDiff = (reference, current, options) => {
  const { color, verbose } = options;
  return new Promise((resolve, reject) => {
    verbose && debugStart(`Creating a diff image.`, 5);
    looksSame.createDiff(
      {
        reference,
        current,
        highlightColor: color,
      },
      (error, screenDiff) => {
        verbose && debugEnd(5);
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
 * @param  {{duration: number, verbose: boolean }} options
 * @return {buffer} screenshot image buffer
 */
const screenshot = async (url, options) => {
  const { delay, verbose, identity } = options;

  verbose && debugStart(`Launching a Puppeteeer for ${identity} URL.`, 1);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  verbose && debugEnd(1);

  verbose &&
    debugStart(
      `Waiting for the ${identity} page rendered with ${delay}ms delay option.`,
      2
    );
  await page.goto(url);
  await sleep(delay);
  verbose && debugEnd(2);

  verbose && debugStart(`Taking screenshot for the ${identity} page.`, 3);
  const screenshot = await page.screenshot({ fullPage: true });
  verbose && debugEnd(3);

  verbose && debugStart(`Closing the Puppeteeer for ${identity} URL.`, 4);
  await browser.close();
  verbose && debugEnd(4);
  return screenshot;
};

/**
 *
 * @param {string}   referenceUrl referenced url
 * @param {string?}  currentUrl   current url
 * @param {object}   options      { color: string, duration: number, verbose?: bool, reference?: bool, current?: bool }
 * @return {buffer} diff image buffer
 */
const lib = async (referenceUrl, currentUrl, options) => {
  const delay = Math.max(0, options.delay || 0);
  const verbose = !!options.verbose;
  const [referenceImage, currentImage] = await Promise.all([
    referenceUrl &&
      screenshot(referenceUrl, { delay, verbose, identity: "referred" }),
    currentUrl &&
      screenshot(currentUrl, { delay, verbose, identity: "current" }),
  ]);

  let output;
  if (!currentUrl) {
    output = referenceImage;
  } else {
    const { color } = options;
    output = await generateDiff(referenceImage, currentImage, {
      color,
      verbose,
    });
  }
  verbose && debugSummary();
  return output;
};

module.exports = lib;
