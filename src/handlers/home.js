const fs = require("fs");
const templates = require("../../public/templates")

function homeHandler(request, response) {
    response.writeHead(200, { "content-type": "text/html" });
    response.end(templates.home())
    // fs.readFile(__dirname + "/../../public/index.html", function (error, file) {
    //   if (error) {
    //     response.writeHead(500, { "Content-Type": "index/html" });
    //     response.end("<h1>Server Error</h1>");
    //   }
    //   response.end(file);
    // });
  }
  
  module.exports = homeHandler;