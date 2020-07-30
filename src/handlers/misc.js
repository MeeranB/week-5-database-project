const fs = require("fs");
const path = require("path");

function miscHandler(request, response) {
  const { url } = request;
  const extension = url.split(".")[1];
  const pathName = url.split("/");
  const headers = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpeg",
    png: "image/png",
    txt: "text/plain",
  };
  response.writeHead(200, { "Content-Type": headers[extension] });
  fs.readFile(path.join(__dirname, "..", "..", "public", ...pathName), (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "index/html" });
      response.end("<h1>Server Error</h1>");
    }
    response.end(file);
  });
}

module.exports = miscHandler;