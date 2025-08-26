import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // normal JSON parsing for other routes

// Clerk webhook route → raw body
app.post("/clerk", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

// routes
app.get("/", (req, res) => res.send("Hello from server"));

// listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server listening on port ${PORT}`);
});
