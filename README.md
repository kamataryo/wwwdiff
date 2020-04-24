# wwwdiff

![https://github.com/kamataryo/wwwdiff/actions](https://github.com/kamataryo/wwwdiff/workflows/npmpublish/badge.svg)

wwwdiff is a simple CLI tool to make a diff image between 2 web pages.

## Prerequisite

- Node.js 10.x

## Usage

```shell
$ npm install -g wwwdiff
$ wwwdiff https://example.com/a https://examle.com/b > ./sample.png
```

## Example

See the diff between [sample A](https://kamataryo.github.io/wwwdiff/sample-a.html) and [sample B](https://kamataryo.github.io/wwwdiff/sample-b.html).

```shell
$ npx wwwdiff https://kamataryo.github.io/wwwdiff/sample-a.html https://kamataryo.github.io/wwwdiff/sample-b.html > ./sample-diff.png
```

| Sample A                    | Sample B                    | Diff                              |
| :-------------------------- | :-------------------------- | :-------------------------------- |
| ![sample a](./sample-a.png) | ![sample b](./sample-b.png) | ![diff sample](./sample-diff.png) |

## options

You can alter hightlighting color option with `--color` or `-c`.

```shell
$ wwwdiff -h

  A simple CLI tool to make a diff image between 2 web pages

  Usage
      $ wwwdiff https://example.com/a https://example.com/b > example.png
  Options
    --color, -c <color> hightlighting color. The default is #ff00ff.
```

You can simply take single screenshot with one URL argument.

```shell
$ wwwdiff https://example.com/a > example.png
```
