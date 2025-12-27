const { MongoClient } = require('mongodb');

let db;

async function connect() {
  if (db) return db;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not set');
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  db = client.db('collab');
  return db;
}

module.exports = connect;
