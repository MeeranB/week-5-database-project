const fs = require("fs");
const templates = require("../../public/templates")

function homeHandler(request, response) {
    response.writeHead(200, { "content-type": "text/html" });
    response.end(templates.home())
  }
  
  module.exports = homeHandler;