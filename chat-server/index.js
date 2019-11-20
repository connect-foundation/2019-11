const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(4000);
// WARNING: app.listen(4000) will NOT work here!

const rooms = {};

io.on("connection", function(socket) {
  socket.on("message", ({ roomId, sessionId, userId, text }) => {
    io.to(roomId).emit("message", { sessionId, userId, text });
  });

  socket.on("joinRoom", ({ roomId, sessionId, userId }) => {
    console.log(roomId, sessionId, userId);
    //해당 socket(client)를 특정 room에 Join 시킨다.
    socket.join(roomId, () => {
      // 특정 room에 입장해있는 user를 전역객체에 저장한다.
      if (!rooms[roomId]) {
        rooms[roomId] = { sessionId: userId };
      } else {
        rooms[roomId] = { ...rooms[roomId], sessionId: userId };
      }

      io.to(roomId).emit("joinRoom", `${userId}님이 입장하셨습니다.`);
    });
  });

  socket.on("leaveRoom", (roomId, sessionId, userId) => {
    socket.leave(roomId, () => {
      //rooms 정보에서 삭제한다.
      delete rooms[roomId][sessionId];
    });
  });
});
