const User = require('../Models/UserModel')

const {validationResult} = require('express-validator')

var bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')



const Register = async(req,res)=>{
    try {
        // validation leli ktabta
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({errors: errors.mapped()})  // err lel client
        }

        const {name,age,email,password} = req.body

         //check if user already exists
         const found = await User.findOne({email})
         if(found){
             return res.status(400).json({message:'User already exists'})  // err lel client
         }
        
           //hash the password => cryptage ==> security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creation of user
        const newUser = await User.create({name,age,email,password:hashedPassword})

        // generate token ==> security
        const token = await jwt.sign({id: newUser._id},process.env.SECRET,{expiresIn:'30d'})
        res.status(200).json({newUser,token})        // server sucssee 
        
    } catch (error) {
        res.status(500).json({message: error})
    }
}


const Login = async(req,res)=>{
    try {
        const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors : errors.mapped()})
    }
    const {email,password} = req.body
    //verify if the user exists ! 
    const found = await User.findOne({email})
    if(!found){
        return res.status(402).json({message:'You have to register before'})
    }
    
    //compare with password of user (req.body)
    const isMatch = await bcrypt.compare(password, found.password)
    if(!isMatch){
       return res.status(401).json({message:'wrong Password'})
    }
    //regenerate the token
    const token = await jwt.sign({id:found._id},process.env.SECRET)
    res.json({found,token})
    } catch (error) {
        res.status(500).json({message: error})
    }
}



const GetDataUsers = async(req,res)=>{
    try {
     const users = await User.find({});
     res.status(201).json(users)
    } catch (error) {
     res.status(500).json({message: error})
 
    }
 }

 const UpdateDataUser = async(req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).select('-password')
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message: error})

    }
}

const DeleteUsers = async(req,res)=>{
    try {
        const Deleteduser = await User.findByIdAndDelete(req.params.id)
        res.json({Deleteduser,msg:'the user has been deleted'})
    } catch (error) {
        res.status(500).json({message: error})

    }
}


module.exports={Register,Login,GetDataUsers,UpdateDataUser,DeleteUsers}