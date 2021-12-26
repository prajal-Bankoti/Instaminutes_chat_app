var socket = io();

let name;
let inputBox = document.querySelector("#inputBox");
let textBox = document.querySelector("#text-box");

do {
  userName = prompt("Please enter your name").toUpperCase();
} while (!userName);

function showName() { // showing user name function
  let msg = {
    user: userName,
    message: `${userName} is conneced`,
    start: Date().split(" ")[4],
  };
  appendMessage(msg, "out-msg");
  socket.emit("mess", msg);
}
showName();

/// for press enter button 
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    e.target.value=""
  }
});

function sendMessage(message) {
  let msg = {
    user: userName,
    message: message,
    start: Date().split(" ")[4],/// for showing date
  };
  console.log(Date.now());
  appendMessage(msg, "out-msg");
  textBox.scrollTo(0, textBox.scrollHeight);
  console.log(textBox.scrollHeight);
  socket.emit("mess", msg);
}

/// append function to show massage
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.id = className;

  let mar = `
  <span>${msg.start}</span>
  <div>${msg.user}</div>
  <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = mar;
  textBox.appendChild(mainDiv);
}

/// To receive massage from server
 socket.on("mess", (msg) => {
  textBox.scrollTo(0, textBox.scrollHeight); /// to sroll 
  appendMessage(msg, "inc-msg");
});
