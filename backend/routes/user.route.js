import { Router } from "express";
import {registerUser, loginUser,getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment} from "../controllers/user.controller.js"
import upload from "../middlewares/multer.js"
import authUser from "../middlewares/auth.user.js";

const router = Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-profile",authUser, getProfile)
// router.get("/get-profile", getProfile)
router.post("/update-profile", upload.single('image'),authUser,  updateProfile)
router.post("/book-appointment",authUser, bookAppointment)
router.get("/appointments", authUser,listAppointment)
router.post("/cancel-appointment", authUser, cancelAppointment)

export default router;