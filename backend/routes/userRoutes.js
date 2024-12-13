const express = require("express");
const {
  createUser,
  updateUser,
  loginUser,
  deleteUser,
  getAllUsers,
  forgetPassword,
} = require("../controllers/userControllers");
const checkToken = require("../middleware/checkToken");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/update/:_id", checkToken, updateUser);
router.delete("/delete/:_id",checkToken ,deleteUser);
router.get("/getall", getAllUsers);
router.post("/forgetPassword", forgetPassword);

module.exports = router;
