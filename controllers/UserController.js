const User = require("../models/User.js");
const UserGroup = require("../models/Usergroup.js");
const bcrypt = require("bcryptjs");

// ------------------------ Users ------------------------------ //

// Get users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ blockstatus: 0, deletestatus: 0 }).populate("role");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Insert users
const insertUsers = async (req, res) => {
    try {
        const { password, ...userData } = req.body;

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ ...userData, password: hashedPassword });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update users
const updateUsers = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete users
// const deleteUsers = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ message: "User deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

const deleteUsers = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { deletestatus: 1, blockstatus: 1 });
        res.json({ message: "User deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ------------------------ Usergroup ------------------------------ //

// Get usergroup
const getUsergroup = async (req, res) => {
    try {
        const groups = await UserGroup.find();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Insert usergroup
const insertUsergroup = async (req, res) => {
    try {
        const group = new UserGroup(req.body);
        await group.save();
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update usergroup
const updateUsergroup = async (req, res) => {
    try {
        const group = await UserGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete usergroup
const deleteUsergroup = async (req, res) => {
    try {
        await UserGroup.findByIdAndDelete(req.params.id);
        res.json({ message: "Group deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Exporting functions
module.exports = {
    getUsers,
    insertUsers,
    getUserById,
    updateUsers,
    deleteUsers,
    getUsergroup,
    insertUsergroup,
    updateUsergroup,
    deleteUsergroup,
};
