import express from "express";
import { getUsers, insertUsers, updateUsers, deleteUsers, insertUsergroup, updateUsergroup, deleteUsergroup } from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", insertUsers);
router.put("/users/:id", updateUsers);

export default router;