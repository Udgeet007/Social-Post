const express = require("express");
const {
  createUser,
  updateUser,
  loginUser,
  deleteUser,
  getAllUsers,
  forgetPassword,
  resetPassword,
  passwordReset,
  getUserDetails
   
} = require("../controllers/userControllers");
const checkToken = require("../middleware/checkToken");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/update/:_id", checkToken, updateUser);
router.delete("/delete/:_id",checkToken ,deleteUser);
router.get("/getall", getAllUsers);
router.post("/forgetPassword", forgetPassword);
router.get('/resetToken/:token',resetPassword);
router.post('/resetToken/:token',passwordReset);
router.get('/getUser', checkToken, getUserDetails);

module.exports = router;
