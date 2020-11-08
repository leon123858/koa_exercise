const { Post, User } = require("./model");

async function findUser(userName) {
  const user = await User.findOne({
    where: {
      userName: userName,
    },
    attributes: ["userName", "nickName"],
  });
  console.log(user.dataValues);
}

async function findPost(title) {
  const post = await Post.findOne({
    where: {
      title: title,
    },
    attributes: ["title", "content"],
  });
  console.log(post.dataValues);
}

async function findManyPost(userId) {
  const posts = await Post.findAll({
    where: {
      userId: userId,
    },
    order: [["id", "desc"]],
  });
  console.log(posts.map((item) => item.dataValues));
}

async function findLimitPost(userId, limit, offset) {
  const posts = await Post.findAll({
    where: {
      userId: userId,
    },
    order: [["id", "desc"]],
    limit: limit,
    offset: offset,
  });
  console.log(posts.map((item) => item.dataValues));
}

async function findLimitPostAndCount(userId, limit, offset) {
  const posts = await Post.findAndCountAll({
    where: {
      userId: userId,
    },
    order: [["id", "desc"]],
    limit: limit,
    offset: offset,
  });
  console.log(posts.count);
  console.log(posts.rows.map((item) => item.dataValues));
}

async function findLimitPostAndCountWithRelation(userName, limit, offset) {
  const posts = await Post.findAndCountAll({
    limit: limit,
    offset: offset,
    order: [["id", "desc"]],
    attributes: ["title", "content"],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName"],
        where: {
          userName: userName,
        },
      },
    ],
  });
  console.log(posts.count);
  console.log(
    posts.rows.map((item) => {
      var json = {};
      json["title"] = item.dataValues.title;
      json["content"] = item.dataValues.content;
      json["userName"] = item.dataValues.user.dataValues.userName;
      json["nickName"] = item.dataValues.user.dataValues.nickName;
      return json;
    })
  );
}

async function findLimitUserAndCountWithRelation(userName, limit, offset) {
  const posts = await User.findAndCountAll({
    attributes: ["userName", "nickName"],
    where: {
      userName: userName,
    },
    include: [
      {
        model: Post,
        attributes: ["title", "content"],
        limit: limit,
        offset: offset,
        order: [["id", "desc"]],
      },
    ],
  });
  console.log(posts.count);

  let name = posts.rows[0].dataValues.userName;
  let nick = posts.rows[0].dataValues.nickName;
  console.log(
    posts.rows[0].posts.map((item) => {
      var json = { userName: name, nickName: nick };
      json["title"] = item.dataValues.title;
      json["content"] = item.dataValues.content;
      return json;
    })
  );
}

//findUser("test5");
//findPost("title1");
//findManyPost(1);
//findLimitPostAndCount(1, 2, 0);
//findLimitPostAndCountWithRelation("test5", 2, 2);
//findLimitUserAndCountWithRelation("test5", 5, 0);
