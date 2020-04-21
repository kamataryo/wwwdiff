const meta = require("../package.json");
meta.name = "wwwdiff";
process.stdout.write(JSON.stringify(meta));
