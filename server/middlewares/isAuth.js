const jwt  = require("jsonwebtoken");

function isAuth(req, res, next) {
    let token = req.headers["token"] || ""

    try {
        let data = jwt.decode(token, process.env.JWT_SECRET)
        if (!data) {
            return res.status(409).json({message: "Please login first"})
        }
        req.userId = data.userId
        next()

    } catch (ex) {
        return res.status(409).json({message: "Unauthorized"})
    }
}


module.exports = isAuth