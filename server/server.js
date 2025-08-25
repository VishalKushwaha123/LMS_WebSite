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
// index.js
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);


//port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
