var fs = require("fs"),
    path = require("path"),
    dir = __dirname;

fs.readdirSync(dir).forEach(function(filename) {
    if (filename === "index.js") return;
    describe("test " + filename, require("./" + filename));
});