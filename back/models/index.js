const Sequelize = require('sequelize');

// config에 개발용 DB를 넣음. 나중에는 development가 아닌 production 
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// sequelize(mysql2사용)가 node.js와 mysql 연결
const sequelize = new Sequelize(config.database, config.username, config.password, config);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
