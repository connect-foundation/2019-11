const cron = require("node-cron");
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host:
    process.env.NODE_ENV === "development"
      ? process.env.DB_DOCKER_COMPOSE_SERVICE_HOST
      : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
  let index = 1;
  cron.schedule("*/1 * * * * *", () => {
    if (index > 10) process.exit();
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
