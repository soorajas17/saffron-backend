const users = require("../model/userModel")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

// register
exports.addUserController=async(req,res)=>{
    console.log("Inside addUserController");
    const {fullName,email,password,phone}=req.body
    try {
        const existingUser=await users.findOne({email})
        if (existingUser) {
            res.status(406).json("Already existing user....Please login")
        } else {
            const encryptedPassword=await bcrypt.hash(password,10)
            const newUser=new users({
                fullName,email,password:encryptedPassword,profilePic:"",phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login
exports.logincontroller=async(req,res)=>{
    console.log("Inside logincontroller");
    const {email,password}=req.body
    try {
        const existingUser=await users.findOne({email})
        if (existingUser) {
            let isUserPasswordMatch=await bcrypt.compare(password,existingUser.password)
            if (isUserPasswordMatch || password==existingUser.password) {
                const token= jwt.sign({userId:existingUser._id}, process.env.JWTPASSWORD)
                res.status(200).json({user:existingUser,token})
            }
        } else {
            res.status(404).json("Invalid Email/Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// to get all users
exports.getAllUserController=async(req,res)=>{
    console.log("Inside getAllUserController");
    try {
        const allUsers=await users.find({role:"User"})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
    
}
