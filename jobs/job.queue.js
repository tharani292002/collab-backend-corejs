const { Queue } = require("bullmq");
const redis = require("../config/redis");

module.exports = new Queue("jobs", { connection: redis });
