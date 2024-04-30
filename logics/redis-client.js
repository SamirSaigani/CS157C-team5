// =============== Purpose ====================
// Establish a connection with the Redis database and provide a reusable Redis client across the application.
import { createClient } from 'redis';
/**
 * if redis is running in a different server, ensure the url is well configured
 * redis[s]://[[username][:password]@][host][:port]
 *  const redisUrl='redis://sigani:12345@localhost:6380';
 *  */ 


const redisClient = createClient();
(async () => {
  await redisClient.connect();
})();
console.log("Connecting to the Redis"); 
  
redisClient.on("ready", () => { 
    console.log("Connected to db!"); 
}); 
  
redisClient.on("error", (err) => { 
    console.log("Error in the Connection"); 
}); 
export default redisClient

