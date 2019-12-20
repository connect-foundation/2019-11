const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(4000, () => {
  console.log("##### CHAR-SERVER STARTED #####");
});
// WARNING: app.listen(4000) will NOT work here!

const rooms = {};
const userMapper = {};

io.on("connection", function(socket) {
  socket.on("auctionResult", ({ userId, type, product }) => {
    const sessionId = userMapper[userId];
    console.log(
      `${userId}(${sessionId})에게 ${type}에 대한 이벤트를 전송합니다. 아래는 프러덕트 정보 입니다.`
    );
    console.dir(product);
    io.to(sessionId).emit("auctionResult", { type, product });
  });

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

  socket.on("joinRoom", ({ roomId, sessionId, user }) => {
    console.log(
      `##### USER(${sessionId}, ${user.id})가 ${roomId}방에 접속 #####`
    );

    const userId = user.id;
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

    //userId를 사용하여 socketID에 mappding 될 수 있도록 한다.
    //TODO: 연결시점으로 변경할 수 있도록 하면 좋겠다.
    userMapper[userId] = sessionId;
  });

  socket.on("leaveRoom", ({ roomId, sessionId, user }) => {
    console.log(
      `##### USER(${sessionId}, ${user.id})가 ${roomId}방에서 나감 #####`
    );
    socket.leave(roomId, () => {
      //rooms 정보에서 삭제한다.
      delete rooms[roomId][sessionId];
    });
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECTED");
  });
});
