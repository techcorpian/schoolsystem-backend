import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
   const { username, email, password } = req.body;

   try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ username, email, password: hashedPassword });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

// Login User
export const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
         { id: user._id, username: user.username, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
      );

      res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

// Get User Profile (Protected)
export const getProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};
