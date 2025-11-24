import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
const User = models.User || mongoose.model("User", userSchema);
export default User;
