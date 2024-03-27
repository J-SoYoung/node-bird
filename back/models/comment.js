module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
      // belongsTo가 있는 곳에 해당 테이블의 id컬럼이 생긴다.
      // UserId: '' (댓글을 작성한 유저 id)
      // PostId: '' (댓글이 달린 게시글 id)
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", 
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
