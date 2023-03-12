const jwt = require("jsonwebtoken")
const User = require("../models/User");



exports.verifyAuth = async (req, res, next)=>{

     let token = req.headers["token"] || ""

    try{

         let data = jwt.decode(token, process.env.JWT_SECRET)
        if(!data){
            return res.status(409).json({message: "Please login first"})
        }

        let user = await User.findOne({_id: data.userId})
        if(!user){
            return res.status(409).json({message: "Please login first"})
        }

        user._doc["password"] = null

        res.status(201).json({
            ...user._doc
        })

    } catch(ex){
        next(ex)
    }
}


exports.login = async (req, res, next)=>{

    const {email, password} = req.body

    try{
        let user = await User.findOne({email})
        if(!user){
            return next("This user not register yet.")
        }

        if(user.password !== password){
            return next("Sorry, Password doesn't match")
        }

        let token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        user._doc["password"] = null

        res.status(201).json({
            token,
            ...user._doc
        })


    } catch(ex){
        next(ex)
    }
}


exports.register = async (req, res, next)=>{

    const {email, password, username} = req.body

    try{
        let user = await User.findOne({email})
        if(user){
            return next("This user already registered")
        }

        let newUser = new User({
            username,
            email,
            password
        })

        newUser = await newUser.save()
        if(!newUser){
            return next("User registration fail")
        }

        let token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        newUser._doc["password"] = null

        res.status(201).json({
            token,
            ...newUser._doc
        })


    } catch(ex){
        next(ex)
    }
}