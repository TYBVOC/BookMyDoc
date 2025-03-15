import express, { urlencoded } from "express";
import cors from "cors";
import {connectDB} from "./config/connectDB.js"
import userRouter from "./routes/user.route.js"
import 'dotenv/config'
import {connectCloudinary} from "./config/cloudinary.js"


const app = express()
app.use(express.json())
app.use(cors())

connectDB()
connectCloudinary()



// Api endpoints here
app.use("/api/user", userRouter)


// Server program
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Backend Server is Listening.....");
})





