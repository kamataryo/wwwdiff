const w3Diff = require("./");
const fs = require("fs");
const assert = require("assert");

const urlA = "https://kamataryo.github.io/wwwdiff/sample-a.html";
const urlB = "https://kamataryo.github.io/wwwdiff/sample-b.html";

const main = async () => {
  {
    const diff = await w3Diff(urlA, urlB, { color: "#ff00ff" });
    const snapshot = await fs.promises.readFile("./sample-diff.png");
    assert.deepEqual(diff, snapshot);
  }
  {
    const sampleA = await w3Diff(urlA, void 0, { color: "#ff00ff" });
    const snapshot = await fs.promises.readFile("./sample-a.png");
    assert.deepEqual(sampleA, snapshot);
  }
};

main();
