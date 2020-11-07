const sequelize = require('sequelize');
const seq = require('./seq');

require('./model');

seq.authenticate().then(() => {
    console.log("connect success to db");
}).catch(()=>{
    console.log("connect error to db");
})

seq.sync({force:true}).then(() => {
    console.log("sync success");
    process.exit();
});