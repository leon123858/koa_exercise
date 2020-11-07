const router = require('koa-router')();

router.prefix('/users')

router.post('/login',async(ctx,next)=>{
  const ID = ctx.request.body.ID;
  const password = ctx.request.body.password;
  //console.log(ID + "  " + password);
  ctx.body = {
    ID:ID,password:password
  }
})

module.exports = router
