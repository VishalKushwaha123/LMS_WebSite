import { Webhook } from "svix";
import User from "../models/User.js";
export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    // Verify webhook
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;
    switch (type) {
      case "user.created": {
        // Handle user created event
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
          // Add any other relevant user fields
        };
        await User.create(userData);
        res.json({ message: "User created successfully", userData });
        break;
      }
      case "user.updated": {
        // Handle user updated event
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({ message: "User updated successfully", userData });
        break;
      }
      case "user.deleted": {
        // Handle user deleted event
        await User.findByIdAndDelete(data.id);
        res.json({ message: "User deleted successfully" });
        break;
      }
      default: {
        console.warn("Unhandled webhook event type:", type);
        break;
      }
    }
  } catch (error) {
    console.error("Error registering webhook:", error);
    res.status(500).json({ message: "Internal server error Webhook" });
  }
};