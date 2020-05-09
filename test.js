const w3Diff = require("./");
const fs = require("fs");
const assert = require("assert");

const urlA = "https://kamataryo.github.io/wwwdiff/sample-a.html";
const urlB = "https://kamataryo.github.io/wwwdiff/sample-b.html";

const main = async () => {
  try {
    {
      const diff = await w3Diff(urlA, urlB, { color: "#ff00ff" });
      const snapshot = await fs.promises.readFile("./__test__/sample-diff.png");
      assert.deepEqual(diff, snapshot);
    }
    {
      const sampleA = await w3Diff(urlA, void 0, { color: "#ff00ff" });
      const snapshot = await fs.promises.readFile("./__test__/sample-a.png");
      assert.deepEqual(sampleA, snapshot);
    }
    {
      const sampleA = await w3Diff(urlA, void 0, { color: "#ff00ff" });
      const snapshot = await fs.promises.readFile("./__test__/sample-b.png");
      assert.deepEqual(sampleA, snapshot);
    }
  } catch (error) {
    process.stderr.write(error);
    process.exit(1);
  }
  process.exit(0);
};

main();
