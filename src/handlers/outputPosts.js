const http = require("http");
const fs = require("fs");
const dbConnection = require("../../database/db_connection");

function outputPostsHandler(request, response) {
  //create a query that joins the users and posts tables together. try inner right and left?
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

//if there is a user that areasy exists in the table  do not add to the user table
// else we do add it to the user table
// add to the posts table with the user_id (from the user table)
//in the instance where it is a non matching keyword_id we want to highlight the post
// we will do this when displaying the posts by checking each posts user_id in the user table
//and seeing if the current posts has a matching keyword_id when the respective users keyword-id
//if they do not match then highlight the post otherwise display it normally
