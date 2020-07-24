const homeHandler = require("./handlers/home");
const miscHandler = require("./handlers/misc");
const testHandler = require("./handlers/test");
const databaseHandler = require("./handlers/database");

function router(request, response) {
  const { url } = request;
  console.log(url);
  if (url === "/") {
    console.log("correctly routed")
    homeHandler(request, response);
  } else if (url.endsWith("/test")) {
    testHandler(request, response);
  } else if (url.startsWith("/database")){
    databaseHandler(request, response);
  } else {
    miscHandler(request, response);
  }
}

module.exports = router;