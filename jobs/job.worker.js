const { Worker } = require("bullmq");
const redis = require("../config/redis");

new Worker(
  "jobs",
  async job => {
    await new Promise(r => setTimeout(r, 2000));
    return { result: "Success" };
  },
  { connection: redis }
);
