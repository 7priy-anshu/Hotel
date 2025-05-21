import User from "../Model/user.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Pass raw body buffer directly for verification
    const event = whook.verify(req.body, headers);

    const { data, type } = event;

    console.log(`Received Clerk event: ${type}`, data);

    // Prepare user data safely
    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Anonymous",
      image: data.image_url || "",
    };

    switch (type) {
      case "user.created":
        {
          const existingUser = await User.findById(data.id);
          if (!existingUser) {
            if (!userData.email) {
              throw new Error("Email is required for user creation.");
            }
            await User.create(userData);
            console.log("New user created:", userData);
          } else {
            console.log("User already exists, skipping create:", data.id);
          }
        }
        break;

      case "user.updated":
        {
          const existingUser = await User.findById(data.id);
          if (existingUser) {
            await User.findByIdAndUpdate(data.id, userData, { new: true });
            console.log("User updated:", data.id);
          } else {
            console.log("User not found for update, skipping:", data.id);
          }
        }
        break;

      case "user.deleted":
        {
          const existingUser = await User.findById(data.id);
          if (existingUser) {
            await User.findByIdAndDelete(data.id);
            console.log("User deleted:", data.id);
          } else {
            console.log("User not found for delete, skipping:", data.id);
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${type}`);
        break;
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;
