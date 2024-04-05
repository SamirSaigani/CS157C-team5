/**
 *  Establish a connection with the Redis database and provide a reusable Redis client across the application.
 */
const { createClient } = require('redis');
const redisClient = createClient();
(async () => {
  await redisClient.connect();
})();
module.exports = redisClient;
