const {getAllDatabases, createDatabase, connectDatabase, getStringValue, createStringValue} =  require("../controllers");

const express = require("express");


const router = express.Router()






router.get("/api/v1/databases", getAllDatabases)
router.post("/api/v1/databases", createDatabase)
router.get("/api/v1/databases/:databaseId/connect", connectDatabase)


// perform with string datatype
router.get("/api/v1/databases/:databaseId/string", getStringValue)
router.post("/api/v1/databases/:databaseId/string", createStringValue)






module.exports = router