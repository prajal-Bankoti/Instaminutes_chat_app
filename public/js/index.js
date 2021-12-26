

var socket = io();

let name;
let inputBox = document.querySelector("#inputBox");
let textBox = document.querySelector("#text-box");

do {
  userName = prompt("Please enter your name");
} while (!userName);

inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
function sendMessage(message) {
  let msg = {
    user: userName,
    message: message,
  };
  appendMessage(msg, "out-msg");
  textBox.scrollTo(0, textBox.scrollHeight);
  console.log(textBox.scrollHeight);
  socket.emit("mess", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.id = className;

  let mar = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = mar;
  textBox.appendChild(mainDiv);
}

socket.on("mess", (msg) => {
  textBox.scrollTo(0, textBox.scrollHeight);
  appendMessage(msg, "inc-msg");
});
