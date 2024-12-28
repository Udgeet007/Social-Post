let PostCollection = require("../models/PostModel");

const createPost = async (req, res) => {
  let { title, description, file } = req.body;
  let _id = req.user;

  try {
    let data = await PostCollection.create({
      title,
      description,
      file,
      userId: _id,
    });
    res
      .status(200)
      .json({ msg: "post created successfully", success: true, data });
  } catch (error) {
    res.json({
      msg: "error in creating post",
      succss: false,
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  res.send("create function is running!");
};

const deletePost = async (req, res) => {
  res.send("create function is running!");
};

const getAllPost = async (req, res) => {
  try {
    let posts = await PostCollection.find()
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "name profilePic" }).populate({path:"comments",populate:{path:'user', select:'name profilePic'}}); //userid jaige usercollections se saare details utha kr leaiigi.
    res
      .status(200)
      .json({ msg: "all data fetched successfully", success: true, posts });
  } catch (error) {
    res.json({
      msg: "error in getting all posts",
      success: false,
      error: error.message,
    });
  }
}; 

const getYourPost = async (req, res) => {
  try {
    let userId = req.user;
    let post = await PostCollection.find({ userId: userId }).populate("userId");
    res.json({ msg: "post get successfully", success: true, post });
  } catch (error) {
    res.json({
      msg: "error in getting user post",
      success: false,
      error: error.message,
    });
  }
};

const getfriendPost = async (req, res) => {
  let id = req.params._id;
  try {
    let posts = await PostCollection.find({ userId: id });
    res.json({ msg: "post get successfully", success: true, posts });
  } catch (error) {
    res.json({
      msg: "error in getting posts",
      success: false,
      error: error.message,
    });
  }
};


const commentPost = async(req,res)=>{
 try {
  const {text} = req.body;
  const userId = req.user;
  const postId = req.params.postId;

  let post = await PostCollection.findById(postId);
  post.comments.push({user:userId, text})
  await post.save();
  res.json({msg:"post commented successfully", success:true})
 } catch (error) {
  res.json({msg:"error in comment post", success:false, error:error.message});
 }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getYourPost,
  getfriendPost,
  commentPost
};
