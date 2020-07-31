const dbConnection = require("../database/db_connection");

function newUser(searchParams) {
  //Takes converted searchParams object and adds it to USER table
  const keywordMap = {
    red: 1,
    green: 2,
    blue: 3,
  };
  const values = [searchParams.userInput, keywordMap[searchParams.colorInput]];
  return dbConnection
    .query(`INSERT INTO users (username, keyword_id) VALUES ($1, $2)`, values)
    .then(console.log(`new user ${values[0]} created`))
    .catch((err) => {
      console.log(err);
    });
}

function newPost(searchParams, ID) {
  //Gets id of username posted and then adds this id + messageContent to the post table
  console.log(
    `This new post will have user_id of ${ID} and message of ${searchParams.messageInput}`
  );
  if (ID > 0) {
    const values = [ID, searchParams.messageInput];
    return dbConnection
      .query(
        `INSERT INTO posts (user_id, text_content) VALUES ($1, $2)`,
        values
      )
      .catch((err) => console.log(err));
  } else {
    console.log(`the new user does not exist`);
    console.log("the searchParams contain:" + searchParams);
    const values = [
      checkUserID(searchParams).then((res) => console.log(typeof res)),
      searchParams.messageInput,
    ];
    console.log(`the new post entry values are ${values[0]} and ${values[1]}`);
    return dbConnection
      .query(
        `INSERT INTO posts (user_id, text_content) VALUES ($1, $2)`,
        values
      )
      .catch((err) => console.log(err));
  }
}

function checkUserID(searchParams) {
  //Uses input username to check users table for existing user
  //returns id if found, -1 if id is not found
  console.log(`checking userId of ${searchParams.userInput}`);
  const values = [searchParams.userInput];
  return dbConnection
    .query(`SELECT id FROM users WHERE username = $1`, values)
    .then((res) => {
      if (res.rows.length > 0) return res.rows[0]["id"];
      else if (res.rows.length == 0) return -1;
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
      return res.rows;
    });
}

module.exports = {
  newUser,
  newPost,
  checkUserID,
  getPosts,
};
