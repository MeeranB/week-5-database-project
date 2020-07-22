const homeHandler = require("./handlers/home");
const miscHandler = require("./handlers/misc");

function router(request, response) {
  const { url } = request;
  if (url === "/") {
    console.log("correctly routed")
    homeHandler(request, response);
  } else {
    miscHandler(request, response);
  }
}

module.exports = router;