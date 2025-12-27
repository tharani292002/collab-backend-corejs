const { Worker } = require('bullmq')
const redis = require('../config/redis')

// eslint-disable-next-line no-new
new Worker(
  'jobs',
  async job => {
    // eslint-disable-next-line promise/param-names
    await new Promise(r => setTimeout(r, 2000))
    return { result: 'Success' }
  },
  { connection: redis }
)
