// =============== Purpose ====================
// This class handles product-related operations

import redisClient from './redis-client.js'


// =============== ASYNC FUNCTIONS ====================
class products {
    static getProductURL(params,callback) {
        try {
            // Get the Redis Key from the HTTP Request
            // Example of a HTTP request: http://localhost:3000/api/products/123/456
            // 123 is user id and 456 is product id          
            const redisKey = `user_id:${params.userId}:product_id:${params.productId}`;
            const productData = redisClient.hGet(redisKey, 'url');

            if (productData) {
                // If product data is found in Redis, send it as response
                return callback({ productURL: productData });
            } else {
                // Handle case where product is not found in Redis
                return callback({status:404, message: 'Product not found' });
            }
        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error fetching product URL:', error);
            return callback({status:500, message: 'Error fetching product URL' });
        }
    }
    static createProduct(body,callback) {
        try {
            //create a redis key which will store the data
            const redisKey = `user_id:${body.userId}:product_id:${body.productId}`;
            // Using Redis HSET to store the product data to DB
            redisClient.hSet(redisKey, {
                title: body.title,
                brand: body.brand,
                url: body.url,
                image: body.image
            });

            //S end a success response
            return callback({status:201, message: 'Product created successfully' });
        } catch (error) {
            console.error('Error in createProduct:', error);
            return callback({status:500, message: 'Error processing your request' });
        }
    }
}
export default products
