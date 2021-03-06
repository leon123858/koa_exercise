const sequelize = require("sequelize");
const seq = require("./seq");

const User = seq.define("user", {
  userName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: sequelize.STRING,
  },
});

const Post = seq.define("post", {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Post, {
  foreignKey: "userId",
});

module.exports = {
  User,
  Post,
};
