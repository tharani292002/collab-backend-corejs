const Router = require('koa-router')
const auth = require('../../auth/auth.handler')

const router = new Router({ prefix: '/api/v1/auth' })

router.post('/login', async ctx => {
  ctx.body = await auth.login(ctx.request.body)
})
router.post('/create', async ctx => {
  ctx.body = await auth.create(ctx.request.body)
})
module.exports = router
