import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/ClerkWebhooks.js";


connectDB()

const app = express ()
app.use(cors()) // enable cross-Origin Resourse sharing

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

//  Api to   clear web hook 

app.use("/api/clerk" , clerkWebHooks);

app.get('/' , (req , res )=> res.send("Api is Working") )


const PORT = process.env.PORT  || 3000;


app.listen(PORT , ()=> console.log(`server runing on port ${PORT}`));