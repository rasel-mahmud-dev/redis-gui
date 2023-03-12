const express = require("express")
const morgan = require("morgan")
const cors = require("cors")


require("dotenv").config({})
const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


const mongoose = require("mongoose");
const routes = require("./routes");

app.use(routes)


app.get("/", (req, res)=>{
    res.send("hi")
})


app.use((err, req, res, next)=>{
    let status = err.status || 500

    res.status(status).json({
        message: err.message || "Internal Error"
    })
})



const PORT  = process.env.PORT || 2000

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected")
}).catch((ex)=>{
    console.log("mongodb connection fail")
})

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)  )