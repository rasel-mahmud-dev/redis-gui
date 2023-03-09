const Database = require("../models/Database");
const redisConnections = require("../utils/redisConnections")

const redisClient  = {}

// get all saved databases
exports.getAllDatabases = async (req, res, next)=>{
    try{
        const dbList = await Database.find()
        res.status(200).json(dbList)
    } catch (ex){
        next(ex)
    }
}

// create new database
exports.createDatabase = async (req, res, next)=>{
    const {alias, host, port, username, password } = req.body
    let title = alias ? alias : host + ":" + port

    try{
        let newConnection = new Database({
            alias: title,
            host,
            port: Number(port),
            username,
            password,
            userId: "6409bac9162ddd7b5c7030ce"
        })
        newConnection = await newConnection.save()
        res.status(200).json(newConnection)

    } catch (ex){
        next(ex)
    }
}


// connect redis client
exports.connectDatabase = async (req, res, next)=>{
    const { databaseId } = req.params

    let client = await redisConnections(databaseId, redisClient)

    res.status(201).json({
        message: "Redis database connected"
    })
}

// get string value
exports.getStringValue = async (req, res, next)=>{
    const { databaseId } = req.params
    const {key} = req.body

    if(!key) return res.status(403).json({message: "Please provide key"})

   try{
       let client = await redisConnections(databaseId, redisClient)
       let value = await client.GET(key)
       res.status(201).json(value)
   } catch(ex){
       next(ex)
   }
}

// insert string value
exports.createStringValue = async (req, res, next)=>{
    const { databaseId } = req.params
    const {key, value} = req.body

    if(!key) return res.status(403).json({message: "Please provide key"})
    if(!value) return res.status(403).json({message: "Please provide value"})

    try{
        let client = await redisConnections(databaseId, redisClient)
        let result = await client.SET(key, value)
        console.log(result)
        res.status(201).json({success: "ok"})
    } catch(ex){
        next(ex)
    }
}


// update string value
exports.updateStringValue = async (req, res, next)=>{
    const { databaseId } = req.params
    const {key, value} = req.body

    if(!key) return res.status(403).json({message: "Please provide key"})
    if(!value) return res.status(403).json({message: "Please value"})

    try{
        let client = await redisConnections(databaseId, redisClient)
        let result = await client.SET(key, value)
        res.status(201).json({success: "ok"})
    } catch(ex){
        next(ex)
    }
}


// delete string value
exports.deleteKeys = async (req, res, next)=>{
    const {keys} = req.body
    const { databaseId } = req.params

    if(!keys || !Array.isArray(keys)) return res.status(403).json({message: "Please provide array of key"})

    try{
        let client = await redisConnections(databaseId, redisClient)
        keys.forEach((key, indx)=>{

            (async function(){
               await client.DEL(key)
                // end of loop
                if(keys.length === indx + 1){
                    res.status(201).json({success: "ok"})
                }
            }())
        })

    } catch(ex){
        next(ex)
    }
}


// delete string value
exports.getKeys = async (req, res, next)=>{
    const { databaseId } = req.params

    if(!databaseId) return res.status(403).json({message: "Please provide database id"})

    try{
        let client = await redisConnections(databaseId, redisClient)
        let result = await client.keys("*")
        let output = []
        if(result && Array.isArray(result)){
            result.forEach((item, idx)=>{

                (async function (){

                    let dataType = await client.type("name")
                    output.push({
                        [item]: dataType
                    })

                    if(idx + 1 === result.length){
                        res.status(200).json({
                            total: result.length,
                            keys: output
                        })
                    }
                }())

            })
        }

    } catch(ex){
        next(ex)
    }
}

