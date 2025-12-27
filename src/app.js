const Koa = require("koa");
const body = require("koa-body");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");

const app = new Koa();

// global error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 400;
    ctx.body = { error: err.message };
  }
});

// body parser
app.use(body());

// routes
app.use(authRoutes.routes());
app.use(projectRoutes.routes());

module.exports = app;
