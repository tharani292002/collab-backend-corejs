const connect = require("../config/mongo");
const { v4: uuid } = require("uuid");

/**
 * CREATE
 */
exports.create = async (user, body) => {
  const db = await connect();

  const project = {
    _id: uuid(),
    name: body.name,
    ownerId: user.sub,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: user.userId
  };

  await db.collection("projects").insertOne(project);
  return {message: "Project Created Successfully", status: 'success', statusCode: 200};
};

/**
 * READ (list)
 */
exports.list = async user => {
  const db = await connect();
  return db
    .collection("projects")
    .find({ ownerId: user.sub })
    .toArray();
};

/**
 * READ (single)
 */
exports.getById = async (user, projectId) => {
  const db = await connect();

  const project = await db.collection("projects").findOne({
    _id: projectId,
    ownerId: user.sub
  });

  if (!project) return { statusCode: 404, status: 'error', message: "Project not found" };
  return project;
};

/**
 * UPDATE
 */
exports.update = async (user, projectId, body) => {
  const db = await connect();

  const result = await db.collection("projects").findOneAndUpdate(
    { _id: projectId, ownerId: user.sub },
    {
      $set: {
        name: body.name,
        updatedAt: new Date()
      }
    },
    { returnDocument: "after" }
  );

  if (!result) return { statusCode: 404, status: 'error', message: "Project not found" };
  return result;
};

/**
 * DELETE
 */
exports.remove = async (user, projectId) => {
  const db = await connect();

  const result = await db.collection("projects").deleteOne({
    _id: projectId,
    ownerId: user.sub
  });

  if (result.deletedCount === 0) {
    return { statusCode: 404, status: 'error', message: "Project not found" };
  }

  return { status: 'success', statusCode: 200, message: "Project deleted successfully" };
};
