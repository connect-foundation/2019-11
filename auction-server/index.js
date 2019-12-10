const cron = require("node-cron");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host:
    process.env.NODE_ENV === "development"
      ? "mysql-server"
      : "honeybee.palda.shop",
  user: "boost",
  password: "boost",
  database: "palda",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const socket = require("socket.io-client")("http://localhost:4000");
socket.on("connect", () => {
  console.log("connected");
});
socket.on("event", data => {});
socket.on("disconnect", () => {});

pool.getConnection((err, conn) => {
  if (err) {
    return console.log(err);
  }
  let index = 0;
  cron.schedule("*/1 * * * * *", () => {
    if (index > 5) process.exit();
    conn
      .promise()
      .query("SELECT * FROM users")
      .then(([rows, fileds]) => {
        console.log(rows);
        console.log(`INDEX::::${index++}`);
      })
      .catch(console.log)
      .then(() => conn.release());
  });
});
