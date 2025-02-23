const express = require("express");
const { 
  getUsers, 
  insertUsers, 
  updateUsers, 
  deleteUsers, 
  getUserById, 
  insertUsergroup, 
  updateUsergroup, 
  deleteUsergroup 
} = require("../controllers/UserController.js");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", insertUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUsers);
router.put("/deleteusers/:id", deleteUsers);


module.exports = router;