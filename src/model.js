const dbConnection = require("../database/db_connection");

function newUser(searchParams) {
  //Takes converted searchParams object and adds it to USER table
  console.log(`New user function called with user ${searchParams.userInput}`)
  return checkKeywordID(searchParams)
    .then((res) => {
      const values = [
        searchParams.userInput,
        res
      ]
      console.log(`checkKeywordId found the userInput to be ${values[0]} and the keywordID to be ${values[1]}`)
      return values
    })
    .then((values) => {
      return dbConnection
        .query(`INSERT INTO users (username, keyword_id) VALUES ($1, $2)`, values)
        .then(console.log(`new user ${values[0]} created with keyword_id ${values[1]}`))
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(err => console.log(err))
}

function newPost(searchParams, ID) {
  //Gets id of username posted and then adds this id + messageContent to the post table
  console.log(
    `New post will have user_id: ${ID}, message: ${searchParams.messageInput}, posted_with_keyword: ${searchParams.colorInput}`
  );
  return checkKeywordID(searchParams)
    .then(postedWithKeyword => {
        return values = [
          ID,
          postedWithKeyword,
          searchParams.messageInput
        ];
    })
    .then(values => {
      console.log(`New post values are actually: `);
      console.log(values);
      return dbConnection
      .query(
        `INSERT INTO posts (user_id, posted_with_keyword, text_content) VALUES ($1, $2, $3)`,
        values
      )
      .catch((err) => console.log(err));
    })
    .catch(err => console.log(err));
}

function checkUserID(searchParams) {
  //Uses input username to check users table for existing user
  //returns id if found, -1 if id is not found
  console.log(`checking userId of ${searchParams.userInput}`);
  const values = [searchParams.userInput];
  return dbConnection
    .query(`SELECT id FROM users WHERE username = $1`, values)
    .then((res) => {
      if (res.rows.length > 0) {
        console.log(`UserID is ${res.rows[0]["id"]}`)
        return res.rows[0]["id"];
      } else if (res.rows.length == 0) {
        console.log(`UserID of ${searchParams.userInput} not found, returning ID as -1`)
        return -1;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function highlightCheck(searchParams) {
  //returns 1 if highlight is true, 0 if highlight is false
}

function checkKeywordID(searchParams) {
  const values = [searchParams.colorInput];
  return dbConnection
    .query(`SELECT id FROM keywords WHERE keyword_name = $1`, values)
    .then((res) => {
      return res.rows[0]["id"];
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPosts() {
  //Returns a string of all posts to be passed into the html
  return dbConnection
    .query(
      `
            SELECT users.username, posts.text_content, posts.created_at
            FROM posts RIGHT JOIN users
            ON users.id = posts.user_id
            ORDER BY posts.created_at;
        `
    )
    .then((res) => {
      console.log(res.rows)
      return res.rows;
    });
}

/* TODO: Highlighting process */
//Get posts gets username, text_content, posted_with_keyword, created_at
//In templates, for each object in get posts array:
//Select username's keyword_id from users:
//if this does not match posted_with_keyword map postsList to be highlighted
//else map postList in current styling
//return html

/* TODO: Alternate better(?) Highlighting process */
// This approach has significantly fewer sql queries, however requires an extra column to be created
//Add new column to posts table which represents if highlight is true, using bit datatype
//Add highlighting decision to newPost model
//Get posts gets username, text_content, highlight and created_at
//In templates, for each object in get posts array:
//if highlight property is true, map to highlighted html string
//else map to current html string
//return HTML



module.exports = {
  newUser,
  newPost,
  checkUserID,
  getPosts,
};
