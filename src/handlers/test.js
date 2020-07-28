const http = require("http");
const fs = require("fs");
const dbConnection = require("../../database/db_connection");

function testHandler(request, response) {
  console.log("test handler reached");
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
    console.log(chunk);
  });
  request.on("end", () => {
    console.log(body);
    const data = new URLSearchParams(body);
    console.log(data);
    const form = Object.fromEntries(data);
    const keywordMap = {
      red: 1,
      green: 2,
      blue: 3
    }
    const values = [form.userInput, keywordMap[form.colorInput]];
    dbConnection
      .query(`INSERT INTO users (username, keyword_id) VALUES ($1, $2)`, values)
      .then((res) =>
        dbConnection.query(`SELECT * FROM users`).then((res) => {
          const userTable = JSON.stringify(res.rows);
          console.log(userTable);
          response.writeHead(200, { "content-type": "application/json" });
          response.end(userTable);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = testHandler;

//   postData((err) => {
//     if (err) return console.log(err);
//   }, user);
//   getData((err, res) => {
//     if (err) return console.log(err);
//     console.log(res);
//   });
// }

// function postData(cb, user) {
//     dbConnection.query(`INSERT INTO users (username) VALUES (${user})`, (err, res) => {
//       if (err) return cb(err);
//       console.log(res);
//       console.log('res.rows: ' + res.rows);
//       cb(null, res.rows);
//     });
// };

//if there is a user that areasy exists in the table  do not add to the user table
// else we do add it to the user table
// add to the posts table with the user_id (from the user table)
//in the instance where it is a non matching keyword_id we want to highlight the post
// we will do this when displaying the posts by checking each posts user_id in the user table
//and seeing if the current posts has a matching keyword_id when the respective users keyword-id
//if they do not match then highlight the post otherwise display it normally
