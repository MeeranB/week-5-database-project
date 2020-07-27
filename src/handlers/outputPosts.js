const http = require("http");
const fs = require("fs");
const dbConnection = require("../../database/db_connection");

function outputPostsHandler(request, response) {
  //create a query that joins the users and posts together
  //list out the queries - possibly using map to create a new array with the fields of username and post ?
  dbConnection
    .query(
      `
      SELECT users.username, posts.text_content
      FROM posts RIGHT JOIN users
      ON users.id = posts.user_id
      ORDER BY users.id;
      `
    )
    .then((res) => {
      const posts = res.rows;
      console.log(res.rows);
      const postsList = posts.map(
        (post) => `
        <li>
          <p>${post.text_content}</p>
          <div>${post.username}</p>
        </li>
      `
      );
      response.writeHead(200, { "content-type": "text/html" });
      response.end(`<ul>${postsList.join("")}</ul>`);
    });
}

module.exports = outputPostsHandler;
