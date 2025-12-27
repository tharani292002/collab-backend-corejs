jest.mock('../config/mongo');

const connect = require('../config/mongo');
const jobService = require('../jobs/job.service');

test('Job retries on failure', async () => {
  connect.mockResolvedValue({
    collection: () => ({
      findOne: jest.fn().mockResolvedValue({ retryCount: 0, payload: { fail: true } }),
      updateOne: jest.fn(),
      insertOne: jest.fn().mockResolvedValue({ insertedId: 'job1' }),
    }),
  });

  await expect(
    jobService.processJob('job1')
  ).rejects.toThrow();
});
