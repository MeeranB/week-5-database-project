const form = document.querySelector("form")
form.addEventListener("submit", (event) => logsubmit(event));
const logsubmit = (event) => {
    event.preventDefault();
    console.log("form submitted")
    const userInput = document.getElementById("userInput").value;
    const keywordInput = document.getElementById("keyInput").value;
    const messageInput = document.getElementById("messageInput").value;
    console.log(userInput, keywordInput, messageInput);
    fetch("../src/handlers/test", {
        method: "post",
        body: JSON.stringify({
            user : userInput,
            keyword : keywordInput,
            message : messageInput
        })
    }).then((response) => {
        console.log(response)
    })

}