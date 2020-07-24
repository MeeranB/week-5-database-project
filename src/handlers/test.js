const http = require("http");
const fs = require("fs");
const dbConnection = require("../../database/db_connection");

function testHandler(request, response) {
  console.log("test handler reached");
  response.writeHead(200, {"content-type": "text/html"});
  let body = "";
  request.on("data", chunk => {
    body += chunk;
  });
  request.on("end", () => {
    const formObject = JSON.parse(body);
    console.log(formObject);
    const user = formObject.user;
    const keyword = formObject.keyword;
    const message = formObject.message;
    getData((err, res) => {
      if (err) return console.log(err);
      const dynamicData = JSON.stringify(res);
      console.log(res);
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(dynamicData);
      console.log(response.body);
    });
 })
}

function getData(cb) {
  console.log("getData function reached")
  dbConnection.query('SELECT * FROM Users;', (err, res) => {
    if (err) return cb(err);
    console.log('res.rows: ' + res.rows);
    cb(null, res.rows);
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
