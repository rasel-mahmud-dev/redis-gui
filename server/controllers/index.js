const Redis = require("../models/Database");
const redisConnections = require("../utils/redisConnections")

const redisClient  = {}

exports.getAllDatabases = async (req, res, next)=>{
    const dbList = await Redis.find()
    res.status(200).json(dbList)
}


exports.createDatabase = async (req, res, next)=>{
    const {alias, host, port, username, password } = req.body
    let newConnection = new Redis({
        alias,
        host,
        port: Number(port),
        username,
        password,
        userId: "6409bac9162ddd7b5c7030ce"
    })
    newConnection = await newConnection.save()
    res.status(200).json(newConnection)
}



exports.connectDatabase = async (req, res, next)=>{
    const { databaseId } = req.params

    let client = await redisConnections(databaseId, redisClient)

    console.log(client)

    res.status(201).json({
        message: "Redis connection ok"
    })
}





exports.getStringValue = async (req, res, next)=>{
    const { databaseId } = req.params
    const {key} = req.body

    if(!key) return res.status(403).json({message: "Please provide key"})

   try{
       let client = await redisConnections(databaseId, redisClient)
       let value = await client.GET(key)
       res.status(201).json(value)
   } catch(ex){
       console.log(ex)
   }
}


exports.createStringValue = async (req, res, next)=>{
    const { databaseId } = req.params
    const {key, value} = req.body

    if(!key) return res.status(403).json({message: "Please provide key"})
    if(!value) return res.status(403).json({message: "Please value"})

    try{
        let client = await redisConnections(databaseId, redisClient)
        let result = await client.SET(key, value)
        console.log(result)
        res.status(201).json({success: "ok"})
    } catch(ex){
        console.log(ex)
    }
}
