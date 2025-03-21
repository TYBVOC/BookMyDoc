import express, { urlencoded } from "express";
import cors from "cors";
import {connectDB} from "./config/connectDB.js"
import userRouter from "./routes/user.route.js"
import 'dotenv/config'
import {connectCloudinary} from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

const app = express()
app.use(express.json())
app.use(cors())

connectDB()
connectCloudinary()



// Api endpoints here
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("test", (req, res)=>{
    return res.json({success: true})
})

// Server program
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Backend Server is Listening....."+ process.env.PORT);
})





