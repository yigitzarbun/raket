const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// routers
const playersRouter = require("./players/players-router");
const playersAuthRouter = require("./players_auth/auth-router");
const clubsRouter = require("./clubs/clubs-router");
const clubsAuthRouter = require("./clubs_auth/auth-router");

// server
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use routers
server.use("/api/players", playersRouter);
server.use("/api/playersAuth", playersAuthRouter);
server.use("/api/clubs", clubsRouter);
server.use("/api/clubsAuth", clubsAuthRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server;
