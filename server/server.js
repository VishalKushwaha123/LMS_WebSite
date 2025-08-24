import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

//initilize Express
const app = express();

//connect to database
await connectDB();

//middleware
app.use(cors());

//Routes
app.get("/", (req, res) => res.send("Hello from server"));
app.post("/clerk", express.json(), clerkWebhooks);

//port
export default app;
