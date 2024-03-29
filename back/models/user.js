module.exports = (sequelize, DataTypes) => {
  console.log("로그인 시도중");
  const User = sequelize.define(
    "User", // MySQL에서는 users로 테이블 생성됨
    {
      // MySQL에서 id가 기본적으로 생성됨
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      // uses 모델에 대한 세팅
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    // user가 post를 여러개 작성할 수 있다
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);

    // belongsToMany 다대다, 중간 table이 생성된다.
    // through: 중간 table 이름 수정,
    // as: 컬럼 별칭,
    // foreignKey: 중간 table의 컬럼(userId - userId)이름을 바꿈
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
