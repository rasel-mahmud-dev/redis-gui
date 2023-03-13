const {
    getAllDatabases, createDatabase, connectDatabase, getStringValue, createStringValue, updateStringValue,
    deleteKeys, getKeys, deleteDatabase, updateDatabase, getDatabase, updateKeyName, testConnectDatabase,
    createListValue, getListValue, pushListElement, deleteListElement, updateListElement, insertHashValue, getHashValues,
    deleteHashKey, setHashKeyValue, getJSONValue, insertJSONValue, updateJSONValue
} = require("../controllers");

const express = require("express");
const isAuth = require("../middlewares/isAuth");


const router = express.Router()


router.get("/api/databases", isAuth, getAllDatabases)
router.get("/api/databases/:databaseId", isAuth, getDatabase)
router.post("/api/databases", isAuth, createDatabase)
router.put("/api/databases/:databaseId", isAuth, updateDatabase)
router.get("/api/databases/:databaseId/connect", isAuth, connectDatabase)
router.delete("/api/databases/:databaseId", isAuth, deleteDatabase)


// perform with string datatype
router.get("/api/databases/:databaseId/string", isAuth, getStringValue)
router.post("/api/databases/:databaseId/string", isAuth, createStringValue)
router.put("/api/databases/:databaseId/string", isAuth, updateStringValue)


// perform with list datatype
router.get("/api/databases/:databaseId/list", isAuth, getListValue)
router.post("/api/databases/:databaseId/list/push", isAuth, pushListElement)
router.post("/api/databases/:databaseId/list/delete", isAuth, deleteListElement)
router.post("/api/databases/:databaseId/list", isAuth, createListValue)
router.put("/api/databases/:databaseId/list", isAuth, updateListElement)


// perform with hash datatype
router.get("/api/databases/:databaseId/hash", isAuth, getHashValues)
router.post("/api/databases/:databaseId/hash", isAuth, insertHashValue)
router.post("/api/databases/:databaseId/hash/delete", isAuth, deleteHashKey)
router.post("/api/databases/:databaseId/hash/set", isAuth, setHashKeyValue)

// perform with json datatype
router.get("/api/databases/:databaseId/json", isAuth, getJSONValue)
router.post("/api/databases/:databaseId/json", isAuth, insertJSONValue)
router.put("/api/databases/:databaseId/json", isAuth, updateJSONValue)



// delete keys
router.post("/api/databases/:databaseId/keys/delete", isAuth, deleteKeys)

// update database key name
router.put("/api/databases/:databaseId/key", isAuth, updateKeyName)


// get current database keys
router.get("/api/databases/:databaseId/keys", isAuth, getKeys)


// test connection
router.post("/api/databases/test-connection", isAuth, testConnectDatabase)


module.exports = router