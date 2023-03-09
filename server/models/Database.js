const mongoose = require("mongoose")

const Database = mongoose.model("Database", new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    username: String,
    password: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    timeout: {
        type: String,
        default: 30000
    },
    modules: [],
    new: {
        type: Boolean,
        default: true
    },
    provider: {
        type: String,
        default: "LOCALHOST"
    },
    connectionType: {
        type: String,
        default: "STANDALONE"
    },
}))


module.exports = Database