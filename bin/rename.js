const meta = require("../package.json");
meta.name = "wwwdiff";
delete meta.scripts.postpublish;
process.stdout.write(JSON.stringify(meta));
