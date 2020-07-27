const http = require("http");
const fs = require("fs");
const dbConnection = require("../../database/db_connection");

function testHandler(request, response) {
  console.log("test handler reached");
  let body = "";
  request.on("data", chunk => {
    body += chunk;
    console.log(chunk);
  });
  request.on("end", () => {
    console.log(body);
    const data = new URLSearchParams(body);
    console.log(data);
    const form = Object.fromEntries(data);
    const values = [form.userInput, form.keyInput]
    dbConnection.query(`INSERT INTO users (username, keyword_id) VALUES ($1, $2)`, values)
    .then(res =>
      dbConnection.query(`SELECT * FROM users`)
      .then(res => {
        const userTable = JSON.stringify(res.rows);
        console.log(userTable);
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(userTable);
      })
    )
    .catch(err => {
      console.log(err);
    })
 })
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
