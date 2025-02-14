import mongoose from "mongoose";

const UsergroupSchema = new mongoose.Schema({
   name: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Usergroup", UsergroupSchema);