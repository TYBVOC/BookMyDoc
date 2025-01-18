import express from "express";
import cors from "cors";

const app = express()
app.use(cors())


// Api endpoints here
app.get("/", (req, res)=>{
    res.send("Working.")
})


// Server program
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Backend Server is Listening.....");
})





