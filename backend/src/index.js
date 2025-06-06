import express from "express";
const app = express();
app.use(/api/auth, authRoutes);

app.listen(5001,()=>{
    console.log("server listening on port 5001");
})