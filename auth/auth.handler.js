const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connect = require("../config/mongo");
const { v4: uuid } = require("uuid");
const { createUserSchema, loginSchema } = require("./schemas/user.joi");

exports.login = async body => {
  // Joi validation
  const { error, value } = loginSchema.validate(body);
  if (error) {
    return {
      error: error.details[0].message,
      status: 400
    };
  }
  const db = await connect();
  const user = await db.collection("users").findOne({
    userId: value.userId
  });

  if (!user) return {  error: 'Invalid credentials', status: 401  }

  if (body.role !== user.role) return {  error: 'Invalid credentials', status: 401  }
  if(body.role)

  return {
    accessToken: jwt.sign(
      { sub: user._id, role: user.role, userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    )
  };
};

exports.create = async body => {
  // Joi validation
  const { error, value } = createUserSchema.validate(body);
  if (error) {
    return {
      error: error.details[0].message,
      status: 400
    };
  }

  const db = await connect();

  // Check duplicate email
  const exists = await db.collection("users").findOne({
    userId: value.userId
  });

  if (exists) {
    return { error: "User ID exists", status: 409 };
  }

  const user = {
    _id: uuid(),
    userId: value.userId,
    email: value.email,
    password: await bcrypt.hash(value.password, 10),
    role: value.role,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection("users").insertOne(user);

  return {
    message: "User created successfully",
    user: {
      _id: user._id,
      email: user.email,
      role: user.role
    }
  };
};
