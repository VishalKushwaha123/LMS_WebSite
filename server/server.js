import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// middleware
app.use(cors());

// routes
app.get("/", (req, res) => res.send("Hello from server"));
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

// connect to db
await connectDB();

export default app;
