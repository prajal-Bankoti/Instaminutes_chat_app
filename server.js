const express = require("express");
const app = express();
require('dotenv').config()

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const cors = require("cors");

app.use(cors());

/// connect to style.css and index.js
app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT|| 3000;


/// create the port for index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// connect to socket io
io.on("connection", (socket) => {

  socket.on("mess", (msg) => {
    socket.broadcast.emit("mess",msg)
  });
});

//// connect to port
server.listen(PORT, () => {
  console.log(PORT);
});
