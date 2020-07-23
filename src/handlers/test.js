
const fs = require("fs");
const dbConnection = require("../../database/db_connection");

function testHandler(request, response) {
    response.writeHead(200, { "content-type": "text/html" });
    console.log("test handler reached")
    postData((err) => {
        if (err) return console.log(err);
     });
     getData((err, res) => {
        if (err) return console.log(err);
        let dynamicData = JSON.stringify(res);
        response.writeHead(200, { 'content-type': 'application/json' });
        response.end(dynamicData);
    });
}
  
const postData = (cb) => {
    console.log("postData function reached")
    dbConnection.query(`INSERT INTO users (username, keyword_id) VALUES ('but23', 3)`, (err, res) => {
      if (err) return cb(err);
      console.log(res);
      console.log('res.rows: ' + res.rows);
      cb(null, res.rows);
    });
};

const getData = (cb) => {
    console.log("getData function reached")
    dbConnection.query('SELECT * FROM Users;', (err, res) => {
      if (err) return cb(err);
      console.log('res.rows: ' + res.rows);
      cb(null, res.rows);
    });
};

module.exports = testHandler;