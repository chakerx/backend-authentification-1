const mongoose = require('mongoose')

const UserSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
}, 
age:{
    type:Number,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
})

module.exports=mongoose.model('User',UserSchema) //mta3 el User wesmha UserSchema wmawjouda fel UserModel.js