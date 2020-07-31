const homeHandler = require("./handlers/home");
const miscHandler = require("./handlers/misc");
const submitHandler = require("./handlers/submit");

function router(request, response) {
  const { url } = request;
  console.log(url);
  if (url === "/") {
    homeHandler(request, response);
  } else if (url.endsWith("/submit")) {
    submitHandler(request, response);
  } else {
    miscHandler(request, response);
  }
}

module.exports = router;
