import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/ClerkWebhooks.js";

connectDB();

const app = express();

app.use(cors());

// Parse json for all routes except webhook route
app.use(express.json());

// Use raw body parser ONLY for webhook route to verify signatures correctly
app.use("/api/clerk", clerkWebHooks);

// Clerk middleware for other routes
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API is Working"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
