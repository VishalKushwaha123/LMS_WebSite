// import { Webhook } from "svix";
// import User from "../models/User.js";
// export const clerkWebhooks = async (req, res) => {
//   try {
//     const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     // Verify webhook
//     await webhook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });
//     const { data, type } = req.body;
//     switch (type) {
//       case "user.created": {
//         // Handle user created event
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           imageUrl: data.image_url,
//         };
//         await User.create(userData);
//         res.json({});
//         break;
//       }
//       case "user.updated": {
//         // Handle user updated event
//         const userData = {
//           email: data.email_address[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           imageUrl: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         res.json({});
//         break;
//       }
//       case "user.deleted": {
//         // Handle user deleted event
//         await User.findByIdAndDelete(data.id);
//         res.json({});
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString("utf8");
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = webhook.verify(payload, headers); // ✅ verify
    const { data, type } = evt;                  // ✅ take from verified event

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        try {
          await User.create(userData);
          console.log("✅ User created in MongoDB:", userData);
        } catch (err) {
          console.error("❌ MongoDB insert failed:", err);
        }

        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
        });

        return res.json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true });
      }

      default:
        console.warn("⚠️ Unhandled event:", type);
        return res.status(200).end();
    }
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
