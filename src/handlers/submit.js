const dbConnection = require("../../database/db_connection");
const templates = require("../../public/templates")

function submitHandler(request, response) {
  console.log("test handler reached");
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    const data = new URLSearchParams(body);
    console.log(data);
    const form = Object.fromEntries(data);
    const keywordMap = {
      red: 1,
      green: 2,
      blue: 3
    }
    const values = [
      form.userInput, 
      keywordMap[form.colorInput],
    ];
    dbConnection
      .query(`INSERT INTO users (username, keyword_id) VALUES ($1, $2)`, values)
      .then(() =>
        dbConnection.query(`
          SELECT users.username, posts.text_content
          FROM posts RIGHT JOIN users
          ON users.id = posts.user_id
          ORDER BY users.id;
        `)
        .then((res) => {
          response.writeHead(200, { "content-type": "text/html" });
          response.end(templates.submit(res.rows))
        })
      )
      .catch((err) => {
        console.log(err);
      });
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
