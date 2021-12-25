const express = require("express");

const app = express();

const http = require("http").createServer(app);

app.use(express.static(__dirname));
const PORT = 3001;

app.listen(PORT, () => {
  console.log(PORT);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
