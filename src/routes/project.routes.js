const Router = require('koa-router')
const projects = require('../../projects/project.handler')
const authGuard = require('../middlewares/auth.guard')
const roleGuard = require('../middlewares/role.guard')

const router = new Router({ prefix: '/api/v1/projects' })

router.use(authGuard)

// CREATE
router.post('/', roleGuard('OWNER'), async ctx => {
  ctx.body = await projects.create(ctx.state.user, ctx.request.body)
})

// LIST
router.get('/', async ctx => {
  ctx.body = await projects.list(ctx.state.user)
})

// GET ONE
router.get('/:id', async ctx => {
  ctx.body = await projects.getById(ctx.state.user, ctx.params.id)
})

// UPDATE
router.put('/:id', async ctx => {
  ctx.body = await projects.update(
    ctx.state.user,
    ctx.params.id,
    ctx.request.body
  )
})

// DELETE
router.delete('/:id', async ctx => {
  ctx.body = await projects.remove(ctx.state.user, ctx.params.id)
})

module.exports = router
