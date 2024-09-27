const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const {generateTokenAndSetCookie} = require("../utils/generateToken");


const login = async (req,res,next) => {
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect= await bcrypt.compare(password,user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })
    } catch (e) {
        console.log('Error in login controller',e.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}
 const signUp = async (req,res,next)=>{
    const {fullName,username,password,confirmPassword} = req.body;
    if(password !== confirmPassword){
        return res.status(400).json({error:"Passwords don't match"})
    }

     const user = await User.findOne({username})
     if(user){
         return res.status(400).json({error:"Username already exists"})
     }

     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)

     const newUser = new User({
         fullName,
         username,
         password:hashedPassword,
     })

     if(newUser){
         generateTokenAndSetCookie(newUser._id,res)
         await newUser.save()

         res.status(201).json({
             _id:newUser._id,
             fullName:newUser.fullName,
             username:newUser.username,
         })
     } else{
         res.status(400).json({error:"Invalid user data"})
     }
 }


 const logout = async (req, res, next) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}


module.exports = {
    logout,
    login,
    signUp
}
