const {getAllDatabases, createDatabase, connectDatabase, getStringValue, createStringValue, updateStringValue,
    deleteKeys, getKeys, deleteDatabase, updateDatabase
} =  require("../controllers");

const express = require("express");


const router = express.Router()




router.get("/api/databases", getAllDatabases)
router.post("/api/databases", createDatabase)
router.put("/api/databases/:databaseId", updateDatabase)
router.get("/api/databases/:databaseId/connect", connectDatabase)
router.delete("/api/databases/:databaseId", deleteDatabase)


// perform with string datatype
router.get("/api/databases/:databaseId/string", getStringValue)
router.post("/api/databases/:databaseId/string", createStringValue)
router.put("/api/databases/:databaseId/string", updateStringValue)



// delete keys
router.delete("/api/databases/:databaseId/keys", deleteKeys)



// get current database keys
router.get("/api/databases/:databaseId/keys", getKeys)






module.exports = router