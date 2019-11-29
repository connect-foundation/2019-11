var CustomNamingStrategy_1 = require("./src/custom/CustomNamingStrategy");

module.exports = {
  type: "mysql",
  host: "mysql-server",
  port: 3306,
  username: "boost",
  password: "boost",
  database: "palda",
  logging: true,
  entities: [__dirname + "/src/models/*.ts"],
  seeds: ["src/database/seeds/*.ts"],
  factories: ["src/database/factories/*.ts"],
  synchronize: true,
  charset: "utf8mb4",
  namingStrategy: new CustomNamingStrategy_1.CustomNamingStrategy()
};
