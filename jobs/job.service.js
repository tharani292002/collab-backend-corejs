const connect = require('../config/mongo')

async function submitJob (payload) {
  const db = await connect()

  const job = {
    payload,
    status: 'PENDING',
    retryCount: 0,
    createdAt: new Date()
  }

  const result = await db.collection('jobs').insertOne(job)
  return { id: result.insertedId }
}

async function processJob (jobId) {
  const db = await connect()
  const job = await db.collection('jobs').findOne({ _id: jobId })

  try {
    // simulate work
    if (job.payload.fail) throw new Error('Job failed')

    await db.collection('jobs').updateOne(
      { _id: jobId },
      { $set: { status: 'COMPLETED' } }
    )

    return { status: 'COMPLETED' }
  } catch (err) {
    const retryCount = job.retryCount + 1

    await db.collection('jobs').updateOne(
      { _id: jobId },
      {
        $set: {
          status: retryCount >= 3 ? 'FAILED' : 'RETRYING',
          retryCount
        }
      }
    )

    throw err
  }
}

module.exports = { submitJob, processJob }
