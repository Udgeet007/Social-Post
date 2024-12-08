const mongoose = require("mongoose");

const connectToDB = async() => {

  try {
    let data = await mongoose
    .connect("mongodb://localhost:27017/Social_Media_App");
    console.log('Connected to mongodb successfully');
  } catch (error) {
    console.log('error in connecting mongodb')
  }
 
    // .then(() => console.log("Connected to mongodb successfully"))
    // .catch(() => console.log("error in connecting mongodb"));
};


module.exports = connectToDB;