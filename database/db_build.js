const fs = require("fs");

const dbConnection = require("./db_connection");

const sql = fs.readFileSync(`${__dirname}/db_build.sql`, "utf-8").toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log("Result:", res);
});
