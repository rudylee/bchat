var fs = require('fs');
/*
fs.readFile('badwords.txt', function(err,data){
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }

  console.log(data.toString('ascii'));
});*/

var Lazy = require("lazy");
new Lazy(fs.openSync("badwords.txt", "w")).lines.foreach(function(line){console.log(line.toString());});