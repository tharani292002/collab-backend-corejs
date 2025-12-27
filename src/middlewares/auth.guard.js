const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  const auth = ctx.headers.authorization;

  if (!auth) ctx.throw(401, "Unauthorized");

  const token = auth.split(" ")[1];

  try {
    ctx.state.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    ctx.throw(401, "Invalid token");
  }

  await next();
};
