const connect = require("../config/mongo");
const { v4: uuid } = require("uuid");

async function seedProjects() {
  const db = await connect();
  const projectsCollection = db.collection("projects");

  const count = await projectsCollection.countDocuments();

  if (count > 0) {
    console.log("Projects already exist. Skipping project seed.");
    return;
  }

  const users = await db.collection("users").find().toArray();

  if (users.length === 0) {
    console.log("No users found. Skipping project seed.");
    return;
  }

  const projects = users.map(user => ({
    _id: uuid(),
    name: `${user.role} Project`,
    ownerId: user._id,
    createdAt: new Date()
  }));

  await projectsCollection.insertMany(projects);

  console.log("Initial projects seeded");
}

module.exports = seedProjects;
