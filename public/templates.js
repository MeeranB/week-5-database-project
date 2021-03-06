function sharedLayout(postContent = "") {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Twitter Clone</title>
      <!-- <link rel="icon" href="/favicon.ico"> -->
      <link rel="stylesheet" href="main.css" />
      <meta name="description" content="Pokedex" />
    </head>
    <body>
      <h1>//insert logo here</h1>
      <section class="split form-left">
        <div class="entry-container centered">
          <div class="search-box">
            <form action="/submit" method="post">
              <img src="assets/logo.png" alt="database logo" />
              <div class="input-box">
                <input
                  name="userInput"
                  type="text"
                  id="userInput"
                  required=""
                  autofocus
                />
                <label for="userInput">Username</label>
              </div>
              <div class="input-box">
                <label for="keyInput">Keyword</label>
                <br /><br /><br />
                <div class="radio-button">
                  <input
                    class="color"
                    name="colorInput"
                    type="radio"
                    id="keyInput"
                    required=""
                    value="red"
                  />
                  <label for="redInput" class="color-label">Red</label>
                  <input
                    class="color"
                    name="colorInput"
                    type="radio"
                    id="keyInput"
                    required=""
                    value="green"
                  />
                  <label for="greenInput" class="color-label">Green</label>
                  <input
                    class="color"
                    name="colorInput"
                    type="radio"
                    id="keyInput"
                    required=""
                    value="blue"
                  />
                  <label for="blueInput" class="color-label">Blue</label>
                </div>
              </div>
              <div class="input-box">
                <input
                  name="messageInput"
                  type="text"
                  id="messageInput"
                  required=""
                  autofocus
                />
                <label for="messageInput">Message</label>
              </div>
              <button type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <section class="split post-right">
        <h2>Posts</h2>
        ${postContent}
      </section>
      <script src="app.js"></script>
    </body>
  </html>    
  `;
}

function home() {
  return sharedLayout("");
}

function submit(userPosts) {
  //userPosts is the res.rows array of a db query
  const postsList = userPosts.map(
    (post) => `
        <li>
            <p>${post.text_content}</p>
            <div>${post.username}</p>
            <p>${post.created_at}</p>
            <p>__________________</p>
        </li>
        `
  );
  return sharedLayout(`
      <div class="post-output">
        <ul>${postsList.join("")}</ul>
      </div>
    `);
}

module.exports = {
  home,
  submit,
};
