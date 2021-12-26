const express = require("express");
const app = express();
// const http = require("http").createServer(app);
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const cors = require("cors");

app.use(cors());
app.use(express.static(__dirname + "/public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);
  socket.on("mess", (msg) => {
    socket.broadcast.emit("mess",msg)
  });
});
server.listen(PORT, () => {
  console.log(PORT);
});
