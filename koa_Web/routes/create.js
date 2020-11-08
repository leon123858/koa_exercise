const { Post, User } = require("./model");

async function createUser(userName, password, nickName) {
  const newUser = await User.create({
    userName: userName,
    password: password,
    nickName: nickName,
  });
  //console.log(newUser.dataValues);
}

async function createPost(title, content, userId) {
  const newPost = await Post.create({
    title: title,
    content: content,
    userId: userId,
  });
  //console.log(newPost.dataValues);
}

createUser("test5", "0000", "baby");
createPost("title1", "aaaaaa", 1);
createPost("title1", "aaaaaa", 1);
createPost("title1", "aaaaaa", 1);
createPost("title1", "aaaaaa", 1);
createPost("title1", "aaaaaa", 1);
