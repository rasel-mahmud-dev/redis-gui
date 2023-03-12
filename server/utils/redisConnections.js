const redis = require("redis");

const Database = require("../models/Database")


let connection = {}


function redisConnections(databaseId) {
    return new Promise(async (resolve) => {
        try {

            let database = await Database.findOne({_id: databaseId})
            if (database) {
                const {port, host, username = "", password = "", timeout = 3000} = database
                // connection already close. first make connection.
                let client;

                // const REDIS_URL = `rediss://${username}:${password}@${host}:${port}`

                if(connection[databaseId]){
                    client = connection[databaseId]

                    if(!connection[databaseId].isReady){
                        await client.connect()
                    }

                } else {
                    client = redis.createClient({
                        password,
                        username,
                        socket: {
                            host,
                            port,
                            connectTimeout: Number(timeout)
                        }
                    })
                    await client.connect()
                    // add cache this connection
                    connection[databaseId] = client
                }

                resolve(client)

            } else {
                resolve(null)
            }

        } catch (ex) {
            resolve(null)
        }
    })
}


function testRedisConnections({port, host, username = "", password = "", timeout = 30000}) {
    return new Promise(async (resolve) => {
        try {
            // connection already close. first make connection.
            let  client = redis.createClient(
                {
                password,
                username,
                socket: {
                    host,
                    port,
                    connectTimeout: Number(timeout)
                }

            })

            await client.connect()
            resolve(client)

        } catch (ex) {
            resolve(null)
        }
    })
}

module.exports = {redisConnections,testRedisConnections }