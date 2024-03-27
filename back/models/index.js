const Sequelize = require('sequelize');

// config에 개발용 DB를 넣음. 나중에는 development가 아닌 production 
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// sequelize(mysql2사용)가 node.js와 mysql 연결
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// require로 해당 함수를 실행한다. db의 빈 객체에 5개의 모델 넣음
db.Comment = require('./comment')(sequelize, Sequelize)
db.Hashtag = require('./hashtag')(sequelize, Sequelize)
db.Image = require('./image')(sequelize, Sequelize)
db.Post = require('./post')(sequelize, Sequelize)
db.User = require('./user')(sequelize, Sequelize)

// db객체의 associate관계형 데이터를 실행한다
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
