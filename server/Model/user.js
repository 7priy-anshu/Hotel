
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "hotelOwner"],
      default: "user",
    },
    recentSearchCities: [{ type: String }],
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite issue in development/hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
