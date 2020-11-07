const sequelize = require('sequelize');

const seq = new sequelize('koa2db','root','0000',{
  host:"localhost",
  dialect:"mysql"
})

/*seq.authenticate().then(() => {
    console.log("connect success to db");
}).catch(()=>{
    console.log("connect error to db");
})*/

module.exports = seq;