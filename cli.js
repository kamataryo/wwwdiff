#!/usr/bin/env node
const wwwdiff = require("./index");

const [, , URL_A, URL_B] = process.argv;

const main = async () => {
  try {
    const diff = await wwwdiff(URL_A, URL_B);
    process.stdout.write(diff);
    process.exit(0);
  } catch (error) {
    process.stderr.write(JSON.stringify(error));
    process.exit(1);
  }
};

main();
