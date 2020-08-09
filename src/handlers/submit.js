const dbConnection = require("../../database/db_connection");
const templates = require("../../public/templates");
const databaseMethods = require("../model")

function submitHandler(request, response) {
  console.log("submit handler reached");
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    const data = new URLSearchParams(body);
    const form = Object.fromEntries(data);
    console.log(`passing in the form data to database methods: `)
    console.log(form)
    databaseMethods.checkUserID(form)
      .then(res => {
        if (res > 0) {
          console.log(`user already exists`)
          databaseMethods
            .newPost(form, res)
        } else {
            console.log(`user ${form.userInput} did not previously exist`)
            databaseMethods
              .newUser(form)
            .then(()=> {
              databaseMethods
              .checkUserID(form)
              .then(res => {
                databaseMethods
                  .newPost(form, res)
              })
            })
        }
      })
      .then(() => {
        databaseMethods.getPosts()
          .then(res => response.end(templates.submit(res)))
      })
      .catch(err => console.log(err))
    response.writeHead(200, {"content-type": "text/html"})
  });
}

module.exports = submitHandler;

//if there is a user that areasy exists in the table  do not add to the user table
// else we do add it to the user table
// add to the posts table with the user_id (from the user table)
//in the instance where it is a non matching keyword_id we want to highlight the post
// we will do this when displaying the posts by checking each posts user_id in the user table
//and seeing if the current posts has a matching keyword_id when the respective users keyword-id
//if they do not match then highlight the post otherwise display it normally
