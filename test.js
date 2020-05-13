const w3Diff = require("./");
const fs = require("fs").promises;
const assert = require("assert");

const urlA = "https://kamataryo.github.io/wwwdiff/sample-a.html";
const urlB = "https://kamataryo.github.io/wwwdiff/sample-b.html";

const main = async () => {
  let snapshot;
  const options = { color: "#ff00ff", verbose: true };
  try {
    process.stdout.write("\ntest for diff\n");
    const diff = await w3Diff(urlA, urlB, options);
    snapshot = await fs.readFile("./__test__/sample-diff.png");
    assert.deepEqual(diff, snapshot);

    process.stdout.write("\ntest for sample a\n");
    const sampleA = await w3Diff(urlA, void 0, options);
    snapshot = await fs.readFile("./__test__/sample-a.png");
    assert.deepEqual(sampleA, snapshot);

    process.stdout.write("\n test for sample b\n");
    const sampleB = await w3Diff(urlB, void 0, options);
    snapshot = await fs.readFile("./__test__/sample-b.png");
    assert.deepEqual(sampleB, snapshot);

    process.stdout.write("\ntest for width option\n");
    const sampleA_w1000 = await w3Diff(urlA, void 0, {
      ...options,
      width: 1000,
    });
    snapshot = await fs.readFile("./__test__/sample-a-w1000.png");
    assert.deepEqual(sampleA_w1000, snapshot);
  } catch (error) {
    process.stderr.write(error);
    process.exit(1);
  }
  process.exit(0);
};

main();
