// =============== Purpose ====================
// This class handles user-related operations
import redisClient from './redis-client.js'//import the redis object to help us connect to the database
import bcrypt from 'bcryptjs' //import the crypto library for hashing user passwords

// =============== ASYNC FUNCTIONS ====================
class Users {
    /**call this method to get all the users saved on redis database */
     static async getUsers(callback) {
        try {
            // Get the Redis Key 
            const redisKey = 'admin_users';
            const userData =await redisClient.hGetAll(redisKey);

            if (userData) {
                // If product data is found in Redis, send a response to the callback
                return callback({ status: 201, users: JSON.stringify(userData) });
            } else {
                // Handle case where no user data was found in Redis
                return callback({ status: 404, message: 'Sorry no Users were found' });
            }
        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error fetching system users:', error);
            return callback({ status: 500, message: 'Error fetching Users' });
        }
    }
    /**The method expects two paramaters, a request body and callback
     * The request body contains all the data passed from the api
     * callback contains the result to the api
     */
    static async createUser(body, callback) {
        try {
            
            //create a redis key to store admin Users
            const redisKey = 'admin_users';
            //generate a random string to be user id
            var userId =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            // Using Redis HSET to store the user data to DB. The data will be stored as map
            await redisClient.hSet(redisKey, {
                userId: userId,
                name: body.name,
                username: body.username,
                email: body.email,
                password:bcrypt.hashSync(body.password, 8)//store hashed password
            });

            //S end a success response
            return callback({ status: 201, message: 'User created successfully' });
        } catch (error) {
            console.error('Error in creating Users:', error);
            return callback({ status: 500, message: 'Error processing your request' });
        }
    }
}
export default Users
