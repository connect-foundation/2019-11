var CustomNamingStrategy_1 = require("./src/custom/CustomNamingStrategy");
require('dotenv').config()

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [__dirname + "/src/models/*.ts"],
  seeds: ["src/database/seeds/*.ts"],
  factories: ["src/database/factories/*.ts"],
  synchronize: true,
  charset: "utf8mb4",
  namingStrategy: new CustomNamingStrategy_1.CustomNamingStrategy()
};
