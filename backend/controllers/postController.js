let PostCollection = require('../models/PostModel');

const createPost = async(req,res) =>{
  let { title, description, file } = req.body;
  let _id = req.user;

  try {
    let data = await PostCollection.create({
      title,
      description,
      file, 
      userId:_id
    })
    res.status(200).json({msg:"post created successfully", success:true, data});
  } catch (error) {
    res.json({msg:"error in creating post", succss:false, error:error.message});
  }
}



const updatePost = async(req,res) =>{
  res.send("create function is running!");
}


const deletePost = async(req,res) =>{
  res.send("create function is running!");
}

const getAllPost = async(req,res) =>{
  res.send("create function is running!");
}


module.exports = {
  createPost, updatePost, deletePost, getAllPost
}