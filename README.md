# w3diff

w3diff is a simple CLI tool to make a diff image between 2 web pages.

## Usage

```shell
$ yarn global add w3diff
$ w3diff https://example.com/a https://examle.com/b > ./sample.png
```

## options

```shell
$ w3diff -h

  A simple CLI tool to make a diff image between 2 web pages

  Usage
      $ w3diff https://example.com/a https://example.com/b > example.png
  Options
    --color, -c <color> hightlighting color. The default is #ff00ff.
```

## Sample

See the diff between [sample-a](https://kamataryo.github.io/w3diff/sample-a.html) and [sample-b](https://kamataryo.github.io/w3diff/sample-b.html).

```shell
$ npx w3diff https://kamataryo.github.io/w3diff/sample-a.html https://kamataryo.github.io/w3diff/sample-b.html > ./sample.png
```

![diff sample](./sample.png)
