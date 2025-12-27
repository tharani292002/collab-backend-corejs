module.exports = role => async (ctx, next) => {
  if (ctx.state.user.role !== role) {
    ctx.throw(403, "Forbidden");
  }
  await next();
};
