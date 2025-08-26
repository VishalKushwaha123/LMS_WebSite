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
app.post("/clerk", express.json(), clerkWebhooks);
connectDB();
// listen
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
