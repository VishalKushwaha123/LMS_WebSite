import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("Hello from server"));
app.post("/clerk", clerkWebhooks);

// connect to db
connectDB();
// listen
export default app;
