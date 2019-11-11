var CustomNamingStrategy_1 = require('./src/custom/CustomNamingStrategy');

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'chan',
  password: 'chan',
  database: 'airbnb',
  logging: true,
  entities: [__dirname + '/src/models/*.ts'],
  seeds: ['src/database/seeds/*.ts'],
  factories: ['src/database/factories/*.ts'],
  synchronize: true,
  namingStrategy: new CustomNamingStrategy_1.CustomNamingStrategy()
};
