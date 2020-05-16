# wwwdiff

![https://github.com/kamataryo/wwwdiff/actions](https://github.com/kamataryo/wwwdiff/workflows/npmpublish/badge.svg)

wwwdiff is a simple CLI tool to make a diff image between 2 web pages.

## Prerequisite

- Node.js > 10

## Usage

```shell
$ npm install -g wwwdiff
$ wwwdiff https://example.com/a https://examle.com/b > sample.png
```

Or you can use `wwwdfiff` via `npx`, perhaps it downloads Chromium browser (120MB) for every time.

```shell
$ npx wwwdiff https://example.com/a https://examle.com/b > sample.png
```

## Example

Example with 2 WordPress posts.

| Sample A                    | Sample B                    | Diff                              |
| :-------------------------- | :-------------------------- | :-------------------------------- |
| ![sample a](./sample-a.png) | ![sample b](./sample-b.png) | ![diff sample](./sample-diff.png) |

## options

```shell
$ wwwdiff -h

  wwwdiff is a simple CLI tool to make a diff image between 2 web pages.

  Usage
    $ wwwdiff https://example.com/a https://example.com/b > diff.png
  Options
    --color, -c <color>       hightlighting color. The default is #ff00ff.
    --delay, -d <millisecond> duration until shot. The default value is 0.
    --output, -o <file path>  Use specified file path as output, not sdtout.
    --width, -w <width>       viewport width.
    --verbose                 shows debug messages.
```

### Tips

You can take a single screenshot with one URL argument.

```shell
$ wwwdiff https://example.com/a > example.png
```

### Examples with options

```shell
# Wait 10 seconds before taking screenshots.
$ wwwdiff --delay 10000 https://example.com/a https://example.com/b > diff.png
```

```shell
# Specify output file with option, not using stdout.
$ wwwdiff https://example.com/a https://example.com/b --output diff.png
```

```shell
# Use specified width for viewport..
$ wwwdiff --width 680 https://example.com/a https://example.com/b > diff.png
$ wwwdiff --width 2048 https://example.com/a https://example.com/b > diff.png
```

```shell
# show debug infomation.
$ wwwdiff --verbose https://example.com/a https://example.com/b > diff.png
```
