#!/usr/bin/env node
const meow = require("meow");
const wwwDiff = require("./index");

const [, , url1, url2] = process.argv;

const cli = meow(
  `
	Usage
	  $ wwwdiff https://example.com/a https://example.com/b > example.png

	Options
	  --color, -c Diff hightlighting color
`,
  {
    flags: {
      color: {
        type: "string",
        alias: "c",
        default: "#ff00ff",
      },
    },
  }
);

const main = async () => {
  const [url1, url2] = cli.input;
  const options = cli.flags;

  if (options.h || options.help) {
    cli.showHelp();
  } else if (options.v || options.version) {
    cli.showVersion();
  } else {
    try {
      const diff = await wwwDiff(url1, url2, options);
      process.stdout.write(diff);
      process.exit(0);
    } catch (error) {
      process.stderr.write(
        typeof error === "string" ? error + "\n" : JSON.stringify(error)
      );
      process.exit(1);
    }
  }
};

main();
