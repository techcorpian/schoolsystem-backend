import User from "../models/User.js";
import UserGroup from "../models/Usergroup.js";

// ------------------------ Users ------------------------------ //

//get users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("role");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//insert users
export const insertUsers = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update users
export const updateUsers = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//delete users
export const deleteUsers = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ------------------------ Usergroup ------------------------------ //

//get usergroup
export const getUsergroup = async (req, res) => {
    try {
        const groups = await UserGroup.find();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//insert usergroup
export const insertUsergroup = async (req, res) => {
    try {
        const group = new UserGroup(req.body);
        await group.save();
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update usergroup
export const updateUsergroup = async (req, res) => {
    try {
        const group = await UserGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//delete usergroup
export const deleteUsergroup = async (req, res) => {
    try {
        await UserGroup.findByIdAndDelete(req.params.id);
        res.json({ message: "Group deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};