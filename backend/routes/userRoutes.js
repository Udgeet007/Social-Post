const express = require("express");
const {
  createUser,
  updateUser,
  loginUser,
  deleteUser,
  getAllUsers
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.get("/getall",getAllUsers);

module.exports = router;
