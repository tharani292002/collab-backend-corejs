const bcrypt = require('bcrypt')
const connect = require('../config/mongo')

async function seedUsers () {
  const db = await connect()
  const usersCollection = db.collection('users')

  const count = await usersCollection.countDocuments()

  if (count > 0) {
    console.log('Users already exist. Skipping seed.')
    return
  }

  const passwordHash = await bcrypt.hash('password', 10)

  const users = [
    {
      email: 'admin@test.com',
      password: passwordHash,
      role: 'OWNER',
      userId: 'testDev1'
    },
    {
      email: 'manager@test.com',
      password: passwordHash,
      role: 'MANAGER',
      userId: 'testDev2'
    },
    {
      email: 'user@test.com',
      password: passwordHash,
      role: 'USER',
      userId: 'testDev3'
    }
  ]

  await usersCollection.insertMany(users)

  console.log('Initial users seeded')
}

module.exports = seedUsers
