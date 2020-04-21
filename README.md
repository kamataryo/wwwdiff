# wwwDiff

wwwDiff is a simple CLI to create diff image from two web pages.

## Usage

```shell
$ yarn global add wwwdiff
$ wwwdiff https://example.com/a https://examle.com/b > ./sample.png
```

## options

````shell
$ ./cli.js -h

  a simple CLI to create diff image from two web pages

  Usage
    $ wwwdiff https://example.com/a https://example.com/b > example.png

  Options
    --color, -c Diff hightlighting color
```

## Sample

The diff between [sample-a](https://kamataryo.github.io/wwwdiff/sample-a.html) and [sample-b](https://kamataryo.github.io/wwwdiff/sample-b.html) is like this.

```shell
$ npx wwwdiff https://kamataryo.github.io/wwwdiff/sample-a.html https://kamataryo.github.io/wwwdiff/sample-b.html > ./sample.png
````

![diff sample](./sample.png)
