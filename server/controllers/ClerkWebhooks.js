import User from "../Model/user";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        // Create a Svix Webhook instance
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Extracting Svix headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify and parse the webhook body
        const event = whook.verify(JSON.stringify(req.body), headers);

        // Destructure the verified data
        const { data, type } = event;

        const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || "",
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url || "",
        };

        // Handle different webhook event types
        switch (type) {
            case "user.created":
                await User.create(userData);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;

            default:
                console.log(`Unhandled event type: ${type}`);
                break;
        }

        return res.status(200).json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.error("Webhook Error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default clerkWebHooks;
