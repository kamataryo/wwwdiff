#!/usr/bin/env node
const meow = require("meow");
const w3Diff = require("./index");
const fs = require('fs').promises

const cli = meow(
  `Usage
    $ wwwdiff https://example.com/a https://example.com/b > diff.png
Options
  --color, -c <color>       hightlighting color. The default is #ff00ff.
  --delay, -d <millisecond> duration until shot. The default value is 0.
  --output, -o <file path>  Use specified file path as output, not sdtout.
  --width, -w <width>       viewport width.
  --verbose                 shows debug messages.
`,
  {
    flags: {
      color: {
        type: "string",
        alias: "c",
        default: "#ff00ff",
      },
      delay: {
        type: "number",
        alias: "d",
        default: 0,
      },
      output: {
          type: "string",
          alias: "o",
      },
      width: {
        type: "number",
        alias: "w",
      },
      verbose: {
        type: "boolean",
        default: false,
      },
      reference: {
        type: "boolean",
        default: false,
      },
      current: {
        type: "boolean",
        default: false,
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
      const diff = await w3Diff(url1, url2, options);
      if(options.output) {
        await fs.writeFile(options.output, diff);
      } else {
        process.stdout.write(diff);
      }
      process.exit(0);
    } catch (error) {
      if(error && typeof error.toString === 'function') {
        process.stderr.write(error.toString())
      } else {
        process.stderr.write(error)
      }
      process.exit(1)
    }
  }
};

main();
