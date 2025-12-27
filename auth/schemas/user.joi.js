const Joi = require("@hapi/joi");

exports.createUserSchema = Joi.object({
  email: Joi.string().trim().email().required().default(''),
  password: Joi.string().trim().min(8).required().default(''),
  role: Joi.string().valid("OWNER", "MANAGER", "USER").required().default(''),
  userId: Joi.string().trim().default('')
});

exports.loginSchema = Joi.object({
  role: Joi.string().valid("OWNER", "MANAGER", "USER").required().default(''),
  userId: Joi.string().trim().required().default('')
});
