const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const server = express();
server.use(cors());
server.use(express.json());

const port = process.env.PORT || 4000;

// Root route
server.get("/", (req, res) => res.send("Hello, world!"));

server.use("/users", routes);

module.exports = server;
