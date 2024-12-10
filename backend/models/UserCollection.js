const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      trim:true,  
      minLength:2, 
      maxLength: 30, 
    },
    email:{
      type:String,
      required:true,
      unique:[true,"already registered with this email"], 
    },
    password:{
      type:String,
      required:true,
    },
    city:{
      type:String,
    },
    profilePic:{
      type:String,
    }
}, {timestamps:true});

module.exports = mongoose.model('users',userSchema);