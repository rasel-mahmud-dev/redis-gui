const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())
app.use(morgan("dev"))


app.get("/", (req, res)=>{
    res.send("hi")
})

app.get("/db", (req, res)=>{
    const {host, port, username, password } = req.body
})

const PORT  = process.env.PORT || 2000

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)  )