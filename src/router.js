const homeHandler = require("./handlers/home");
const miscHandler = require("./handlers/misc");
const submitHandler = require("./handlers/submit");
const databaseHandler = require("./handlers/database");

function router(request, response) {
  const { url } = request;
  console.log(url);
  if (url === "/") {
    homeHandler(request, response);
  } else if (url.endsWith("/submit")) {
    submitHandler(request, response);
  } else if (url.startsWith("/database")) {
    databaseHandler(request, response);
  } else {
    miscHandler(request, response);
  }
}

module.exports = router;
