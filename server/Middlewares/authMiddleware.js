const jwt = require("jsonwebtoken");
require('dotenv').config()


exports.AuthMiddleWare = async(req,res,next)=>{
    try {
        const token = req.header('token');
        const verifiedToken = await jwt.verify(token,process.env.SECRET)
        if(!verifiedToken){
           return res.status(402).json({message:'You are not authorized'})
        }
        req.userId = verifiedToken._id
        next()
    } catch (error) {
        res.status(500).json({message: error})
    }
}