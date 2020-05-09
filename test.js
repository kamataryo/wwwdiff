const w3Diff = require("./");
const fs = require("fs").promises;
const assert = require("assert");

const urlA = "https://kamataryo.github.io/wwwdiff/sample-a.html";
const urlB = "https://kamataryo.github.io/wwwdiff/sample-b.html";

const main = async () => {
  let diff, snapshot;
  try {
    process.stdout.write("diff\n");
    diff = await w3Diff(urlA, urlB, { color: "#ff00ff" });
    snapshot = await fs.readFile("./__test__/sample-diff.png");
    assert.deepEqual(diff, snapshot);

    process.stdout.write("sample a\n");
    const sampleA = await w3Diff(urlA, void 0, { color: "#ff00ff" });
    snapshot = await fs.readFile("./__test__/sample-a.png");
    assert.deepEqual(sampleA, snapshot);

    process.stdout.write("sample b\n");
    const sampleB = await w3Diff(urlB, void 0, { color: "#ff00ff" });
    snapshot = await fs.readFile("./__test__/sample-b.png");
    assert.deepEqual(sampleB, snapshot);
  } catch (error) {
    process.stderr.write(error);
    process.exit(1);
  }
  process.exit(0);
};

main();
