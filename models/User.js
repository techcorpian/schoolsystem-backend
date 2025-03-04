const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   username: { type: String, required: true },
   firstname: { type: String, required: true },
   lastname: { type: String, required: false },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   designation: { type: String, required: false },
   //role: { type: mongoose.Schema.Types.ObjectId, ref: "UserGroup" }
   role: { type: String },
   blockstatus: { type: Number, default: 0},
   deletestatus: { type: Number, default: 0},
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
