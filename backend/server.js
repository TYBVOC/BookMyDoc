import express, { urlencoded } from "express";
import cors from "cors";
import {connectDB} from "./config/connectDB.js"
import userRouter from "./routes/user.route.js"
import 'dotenv/config'
import {connectCloudinary} from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

const corsOptions = {
    origin: ["https://book-my-doc-admin.vercel.app", "https://book-my-doc-omega.vercel.app"],
};

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

connectDB()
connectCloudinary()



app.get("/", (req, res)=>{
    return res.json({success: true})
})
// Api endpoints here
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)


// Server program
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Backend Server is Listening....."+ process.env.PORT);
})





