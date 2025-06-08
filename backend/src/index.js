import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser"
import dotenv from "dotenv";
import messageRoutes from "./routes/message.route.js";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieparser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT,()=>{
    console.log("server listening on port: ",PORT);
})