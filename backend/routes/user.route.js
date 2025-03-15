import { Router } from "express";
import {registerUser, loginUser,getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment} from "../controllers/user.controller.js"
import upload from "../middlewares/multer.js"
import authUser from "../middlewares/auth.user.js";

const router = Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-profile", getProfile)
// router.get("/get-profile", getProfile)
router.post("/update-profile", upload.single('image'),authUser,  updateProfile)
router.post("/book-appointment", bookAppointment)
router.get("/appointments", listAppointment)
router.post("/cancel-appointment", cancelAppointment)

export default router;