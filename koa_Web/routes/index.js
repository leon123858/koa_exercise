const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/profile/:who', async (ctx, next) => {
  const  ID  = ctx.params.who;
  console.log(ctx.params);
  ctx.body = {
    title: "who's profile ",
    ID: ID
  }
})

router.get('/loadMore/:who/:page', async (ctx, next) => {
  const  ID  = ctx.params.who;
  const  page  = ctx.params.page;
  console.log(ctx.params);
  ctx.body = {
    title: "load what",
    ID: ID,
    page:page
  }
})

module.exports = router
