const redis = require("redis");

const Database = require("../models/Database")


function isLocalConnection(host) {
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return true
    } else {
        return false
    }
}

function redisConnections(databaseId) {
    return new Promise(async (resolve) => {
        try {

            let database = await Database.findOne({_id: databaseId})
            if (database) {
                const {port, host, username= "", password= "", timeout = 3000} = database

                // connection already close. first make connection.
                let client;

                // const REDIS_URL = `rediss://${username}:${password}@${host}:${port}`

                client = redis.createClient(isLocalConnection(host) ? {} : {
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

            } else {
                resolve(null)
            }

        } catch (ex) {
            console.log(ex)
            resolve(null)
        }
    })
}

module.exports = redisConnections