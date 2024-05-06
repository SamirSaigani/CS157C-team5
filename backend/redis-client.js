// =============== Purpose ====================
// Establish a connection with the Redis database and provide a reusable Redis client across the application.

const { createClient } = require('redis');
const redisUrl='redis://localhost:6379 ';
const redisClient = createClient(redisUrl);

(async () => {
  await redisClient.connect();
})();
module.exports = redisClient;
