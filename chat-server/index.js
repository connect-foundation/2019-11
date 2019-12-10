const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(4000, () => {
  console.log("##### CHAR-SERVER STARTED #####");
});
// WARNING: app.listen(4000) will NOT work here!

const rooms = {};

io.on("connection", function(socket) {
  socket.on("message", ({ roomId, sender, type, text, createdAt }) => {
    console.log(
      `##### USER(${sender.sessionId}, ${sender.loginId})가 ${roomId}방에 ${text} 문자 전송 #####`
    );
    io.to(roomId).emit("message", {
      roomId,
      sender,
      type,
      text,
      createdAt
    });
  });

  socket.on("bid", ({ roomId, sender, bid, createdAt }) => {
    console.log(
      `##### USER(${sender.sessionId}, ${sender.loginId})가 ${roomId}방에서 ${bid.bidPrice} 입찰 #####`
    );
    io.to(roomId).emit("bid", { roomId, sender, bid, createdAt });
  });

  socket.on("purchase", ({ roomId, sender, sold, createdAt }) => {
    console.log(
      `##### USER(${sender.sessionId}, ${sender.loginId})가 ${roomId}방에서 ${sold.soldPrice} 즉시 구매 #####`
    );
    io.to(roomId).emit("purchase", { roomId, sender, sold, createdAt });
  });

  socket.on("joinRoom", ({ roomId, sessionId, userId }) => {
    console.log(
      `##### USER(${sessionId}, ${userId})가 ${roomId}방에 접속 #####`
    );
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
    console.log(
      `##### USER(${sessionId}, ${userId})가 ${roomId}방에서 나감 #####`
    );
    socket.leave(roomId, () => {
      //rooms 정보에서 삭제한다.
      delete rooms[roomId][sessionId];
    });
  });
});
