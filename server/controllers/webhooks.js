import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payloadString = req.body.toString("utf8");
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = webhook.verify(payloadString, headers);
    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.json({ message: "User created successfully", userData });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
        });
        return res.json({ message: "User updated successfully", userData });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ message: "User deleted successfully" });
      }

      default:
        console.warn("Unhandled webhook event type:", type);
        return res.status(200).end();
    }
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(500).json({ message: "Internal server error Webhook" });
  }
};
