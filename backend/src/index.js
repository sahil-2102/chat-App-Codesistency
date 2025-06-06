import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log("server listening on port: ",PORT);
})