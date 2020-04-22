# wwwdiff

wwwdiff is a simple CLI tool to make a diff image between 2 web pages.

## Usage

```shell
$ yarn global add wwwdiff
$ wwwdiff https://example.com/a https://examle.com/b > ./sample.png
```

## options

```shell
$ wwwdiff -h

  A simple CLI tool to make a diff image between 2 web pages

  Usage
      $ wwwdiff https://example.com/a https://example.com/b > example.png
  Options
    --color, -c <color> hightlighting color. The default is #ff00ff.
```

## Sample

See the diff between [sample A](https://kamataryo.github.io/wwwdiff/sample-a.html) and [sample B](https://kamataryo.github.io/wwwdiff/sample-b.html).

```shell
$ npx wwwdiff https://kamataryo.github.io/wwwdiff/sample-a.html https://kamataryo.github.io/wwwdiff/sample-b.html > ./sample.png
```
| Sample A                    | Sample B                    | Diff                        |
| :-------------------------- | :-------------------------- |:--------------------------- |
| ![sample a](./sample-a.png) | ![sample b](./sample-b.png) | ![diff sample](./sample.png)|
