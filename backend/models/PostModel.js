const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
    type:String,
  },
  description:{
    type:String,
  },
  file:{
    type:String,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    require:true,
  },
}, {timestamps:true});


module.exports = mongoose.model("posts", postSchema);
