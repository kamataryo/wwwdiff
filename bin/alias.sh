#!/bin/sh

mkdir -p alias-package
rsync -a --exclude './alias-package' . ./alias-package
node bin/rename.js > ./alias-package/package.json
