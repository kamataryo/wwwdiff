const puppeteer = require("puppeteer");
const looksSame = require("looks-same");

module.exports = async (URL_A, URL_B) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // check if both url can be navigated at first
  await page.goto(URL_A);
  await page.goto(URL_B);

  await page.goto(URL_A);
  const buffA = await page.screenshot({ fullPage: true });
  await page.goto(URL_B);
  const buffB = await page.screenshot({ fullPage: true });
  await browser.close();

  return await new Promise((resolve, reject) =>
    looksSame.createDiff(
      {
        reference: buffA,
        current: buffB,
        highlightColor: "#ff00ff",
      },
      (error, buffer) => {
        if (error) {
          reject(error);
        } else {
          resolve(buffer);
        }
      }
    )
  );
};
