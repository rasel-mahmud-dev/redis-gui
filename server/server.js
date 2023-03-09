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

app.get("/db", async (req, res)=>{
    const {host, port, username, password } = req.body

    let client = redis.createClient()
    console.log(host, port)
    await client.connect()
    await client.set('name', 'rasel mahmud');
    const value = await client.get('name');

    res.send(value)

})

const PORT  = process.env.PORT || 2000

mongoose.connect("mongodb://127.0.0.1:27017/redis-management").then(()=>{
    console.log("mongodb connected")
}).catch((ex)=>{
    console.log(ex, "sdfkj")
})

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)  )