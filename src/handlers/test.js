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
    response.end(`end`);
  //   const formObject = JSON.parse(body);
  //   console.log("formObject: " + formObject);
  //   const user = formObject.user;
  //   const keyword = formObject.keyword;
  //   const message = formObject.message;
  //   dbConnection.query('SELECT * FROM Users;')
  //   .then(res => {
  //     const dynamicData = JSON.stringify(res);
  //     response.writeHead(200, { 'content-type': 'application/json' });
  //     response.end(dynamicData);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
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
