const redis = require("redis");

function redisConnections(connectionId, redisClient) {
    return new Promise(async (resolve) => {
        try {

            // connection already close. first make connection.
            let client;
            if (!redisClient[connectionId] || !redisClient[connectionId].isReady) {
                client = redis.createClient()
                await client.connect()
                // let conn = await Redis.findOne({_id: connectionId})
                redisClient[connectionId] = client
            } else {
                client = redisClient[connectionId]
            }
            resolve(client)
        } catch (ex) {
            resolve(null)
        }
    })
}

module.exports = redisConnections