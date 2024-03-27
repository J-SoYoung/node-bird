module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false, // 필수
      },
      // PostId
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Image.associate = (db) => {
    // belongsTo : Image는 Post에 속해있다. 해당Id가 생긴다
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
