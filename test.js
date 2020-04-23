const wwwdiff = require("./");
const fs = require("fs");
const assert = require("assert");

const url1 = "https://kamataryo.github.io/wwwdiff/sample-a.html";
const url2 = "https://kamataryo.github.io/wwwdiff/sample-b.html";

const main = async () => {
  const image = await wwwdiff(url1, url2, { color: "#ff00ff" });
  const snapshot = await fs.promises.readFile("./sample-diff.png");
  assert.deepEqual(image, snapshot);
};

main();
