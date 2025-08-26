import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Clerk needs raw body, not parsed JSON
    const payloadString = req.body.toString("utf8");
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify event
    const evt = webhook.verify(payloadString, headers);
    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id, // Clerk user ID as primary key
          email: data.email_addresses[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        try {
          await User.create(userData);
          return res.json({
            message: "✅ User created successfully",
            userData,
          });
        } catch (err) {
          // Handle duplicate user gracefully
          if (err.code === 11000) {
            return res
              .status(200)
              .json({ message: "⚠️ User already exists", userData });
          }
          throw err;
        }
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true, // create if not exists
          new: true,
        });
        return res.json({ message: "✅ User updated successfully", userData });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ message: "🗑️ User deleted successfully" });
      }

      default:
        console.warn("⚠️ Unhandled webhook event type:", type);
        return res.status(200).end();
    }
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(500).json({ message: "Internal server error Webhook" });
  }
};
