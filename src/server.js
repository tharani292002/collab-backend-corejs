require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const socketHandler = require("../realtime/socket");
const seedUsers = require("./seed");
const seedProjects = require("./seed.projects");

async function start() {
  await seedUsers();
  await seedProjects();

  const server = http.createServer(app.callback());

  const io = new Server(server);
  socketHandler(io);

  server.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

start();
