# wwwdiff

Node.js only web page diff library.

## Usage

```shell
$ yarn global add wwwdiff
$ wwwdiff https://example.com/a https://examle.com/b > ./sample.png
```

## Sample

The diff between [sample-a](https://kamataryo.github.io/wwwdiff/sample-a.html) and [sample-b](https://kamataryo.github.io/wwwdiff/sample-a.html) is like this.

```shell
$ npx wwwdiff https://kamataryo.github.io/wwwdiff/sample-a.html https://kamataryo.github.io/wwwdiff/sample-b.html > ./sample.png
```

![diff sample](./sample.png)
