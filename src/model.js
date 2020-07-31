const dbConnection = require("../database/db_connection");

function newUser(searchParams) {
    //Takes converted searchParams object and adds it to USER table
    const keywordMap = {
        red: 1,
        green: 2,
        blue: 3
      }
      const values = [
        searchParams.userInput, 
        keywordMap[searchParams.colorInput],
      ];
      dbConnection
        .query(`INSERT INTO users (username, keyword_id) VALUES ($1, $2)`, values)
        .catch((err) => {
          console.log(err);
        });
}

function newPost(searchParams) {
    //Gets id of username posted and then adds this id + messageContent to the post table
    const values = [

    ]
}

module.exports = {
    newUser,
    newPost
}