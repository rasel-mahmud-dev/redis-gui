const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())
app.use(morgan("dev"))

const redis  = require("redis")
const mongoose = require("mongoose");
const routes = require("./routes");

app.use(routes)


app.get("/", (req, res)=>{
    res.send("hi")
})


app.use((err, req, res, next)=>{
    let status = err.status || 500

    res.send(status).json({
        message: err.message || "Internal Error"
    })
})



const PORT  = process.env.PORT || 2000

mongoose.connect("mongodb://127.0.0.1:27017/redis-management").then(()=>{
    console.log("mongodb connected")
}).catch((ex)=>{
    console.log(ex, "sdfkj")
})

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)  )