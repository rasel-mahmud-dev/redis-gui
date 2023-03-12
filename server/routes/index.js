const {getAllDatabases, createDatabase, connectDatabase, getStringValue, createStringValue, updateStringValue,
    deleteKeys, getKeys, deleteDatabase, updateDatabase, getDatabase, updateKeyName, testConnectDatabase,
    createListValue, getListValue, pushListElement, deleteListElement
} =  require("../controllers");

const express = require("express");


const router = express.Router()


router.get("/api/databases", getAllDatabases)
router.get("/api/databases/:databaseId", getDatabase)
router.post("/api/databases", createDatabase)
router.put("/api/databases/:databaseId", updateDatabase)
router.get("/api/databases/:databaseId/connect", connectDatabase)
router.delete("/api/databases/:databaseId", deleteDatabase)


// perform with string datatype
router.get("/api/databases/:databaseId/string", getStringValue)
router.post("/api/databases/:databaseId/string", createStringValue)
router.put("/api/databases/:databaseId/string", updateStringValue)





// perform with list datatype
router.get("/api/databases/:databaseId/list", getListValue)
router.post("/api/databases/:databaseId/list/push", pushListElement)
router.post("/api/databases/:databaseId/list/delete", deleteListElement)
router.post("/api/databases/:databaseId/list", createListValue)
router.put("/api/databases/:databaseId/list", updateStringValue)





// delete keys
router.post("/api/databases/:databaseId/keys/delete", deleteKeys)

// update database key name
router.put("/api/databases/:databaseId/key", updateKeyName)


// get current database keys
router.get("/api/databases/:databaseId/keys", getKeys)


// test connection
router.post("/api/databases/test-connection", testConnectDatabase)



module.exports = router