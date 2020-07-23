const fs = require("fs");

function databaseHandler(request, response) {
    response.writeHead(200, { "content-type": "application/js" });
    fs.readFile(__dirname + "/../../database/db_build.js", function (error, file) {
      if (error) {
        response.writeHead(500, { "Content-Type": "index/html" });
        response.end("<h1>Server Error</h1>");
      }
      console.log("database built");
      response.end(file);
    });
  }
  
  module.exports = databaseHandler;