module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
      // UserId
      // RetweetId
    },
    {
      // post 모델에 대한 세팅
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글 저장 + 이모티콘
    }
  );

  Post.associate = (db) => {
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);

    // belongsTo : post는 user에게 속해있다. 해당Id가 생긴다
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.Post, { as: "Retweet" });

    // belongsToMany : 중간 table이 생성된다. => though로 table이름 수정, as로 컬럼별칭
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};
