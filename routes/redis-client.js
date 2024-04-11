// =============== Purpose ====================
// Establish a connection with the Redis database and provide a reusable Redis client across the application.

import redis from "redis";
var redis = require('redis')


const { createClient } = redis;

const redisClient = createClient();
(async () => {
  await redisClient.connect();
})();
module.exports = redisClient;
