import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// routes
app.get("/", (req, res) => res.send("Hello from server"));
app.post("/clerk", clerkWebhooks);
connectDB();
// listen

export default app;
