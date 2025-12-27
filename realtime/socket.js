module.exports = io => {
  io.on("connection", socket => {
    socket.on("join", room => {
      socket.join(room);
      socket.to(room).emit("user:join", socket.id);
    });

    socket.on("file:update", data => {
      socket.to(data.room).emit("file:update", data);
    });
  });
};
