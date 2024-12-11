const jwt = require('jsonwebtoken');
const userCollection = require("../models/UserCollection");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
let JWT_SECRET = "HarHarMahadev"

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check if the email is Already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "Email already exists! please Login!",
        success: false,
      });
    }

    let hashedPassword = bcrypt.hashSync(password, salt);
    console.log(password);
    console.log(hashedPassword);
    let data = await userCollection.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ msg: "User Created Successfully", success: true, data });
  } catch (error) {
    res.status(500).json({
      msg: "error in creating User!",
      success: false,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "email is required", success: false });
  }
  if (!password) {
    return res
      .status(400)
      .json({ msg: "password is required", success: false });
  }

  try {
    let findUser = await userCollection.findOne({ email: email });
    if (findUser) {
      let comparePassword = bcrypt.compareSync(password, findUser .password); // true
      if (comparePassword) {
        let token = jwt.sign({_id:findUser._id}, JWT_SECRET);
        res.status(200).json({
          msg: "User Login Successfully",
          success: true,
          user:findUser,
          token
        });
      } else {
        res.status(401).json({ msg: "invalid password", success: false });
      }
    } else {
      return res
        .status(404)
        .json({ msg: "user not found please sign up", success: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: "error in login user",
      success: false,
      error: error.message,
    });
  }
};

const updateUser = async(req,res)=>{

  const _id  = req.user
  console.log(_id)

  if(_id!==req.params._id){
  return res.json({msg:"not authorized to update this account", success:false})
  }
 
  let {name , password} = req.body

try {
  if(password){
      var hashedPassword = bcrypt.hashSync( password ,salt )
  }
  // let data = await userCollection.updateOne(  find , update )
  // let data = await userCollection.updateOne(  {name:"abc"} , {$set:{name:"bdc"}} )
  let data = await userCollection.findByIdAndUpdate(_id ,{name:name , password:hashedPassword} );
  res.json({msg:"user updated successfull", success:true})
} catch (error) {
  res.json({msg:"error in updating user", success:false, error:error.message})
}
}


const deleteUser = async (req, res) => {
  let id = req.params._id;

  try {
    await userCollection.findByIdAndDelete(req.user);
    res.json({ msg: "user deleted successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in deleting user",
      success: false,
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  const { email } = req.body;
  try {
    // If email is provided, filter by email; otherwise, fetch all users
    const query = email ? { email: email } : {};
    const allUsers = await userCollection.find(query);

    // Check if users were found
    if (allUsers.length === 0) {
      return res.status(404).json({
        msg: "No users found",
        success: false,
      });
    }

    // Return the list of users
    return res.status(200).json({
      msg: "Users retrieved successfully",
      success: true,
      users: allUsers,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      msg: "Error in retrieving users",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { createUser, deleteUser, loginUser, updateUser, getAllUsers };
