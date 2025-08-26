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
import bodyParser from "body-parser";
app.post("/clerk", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

// listen
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`);
});
