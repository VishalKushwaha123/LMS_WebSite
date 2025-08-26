import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Clerk/Firebase/Auth provider user ID
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true, // removes spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // no duplicate emails
      lowercase: true, // normalize email
    },
    imageUrl: {
      type: String,
      default: "https://example.com/default-avatar.png", // fallback avatar
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

// Avoid model overwrite error in dev (important for hot reloads)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
