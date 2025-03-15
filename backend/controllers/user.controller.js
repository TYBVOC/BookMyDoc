import validator from "validator";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary'

const registerUser = async (req, res)=>{
    try {
        const { name, email, password } = req.body;

        console.log(name, email, password);
        

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
    }
}


const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getProfile = async (req, res)=>{
    try {
        const {userId} = req.body;

        const userData = await userModel.findById(userId).select("-password")

        res.json({success: true, userData})

    } catch (error) {
        res.json({message: false, message: error.message})
    }
}
const updateProfile = async (req, res)=>{
    try {
        const {userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: 'Missing Details' })
        }  

        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address); 
            } catch (error) {
                return res.json({ success: false, message: 'Invalid address format' });
            }
        }
        
        await userModel.findByIdAndUpdate(userId, {
            name: name,
            phone: phone,
            address: parsedAddress || { line1: '', line2: '' },
            dob: dob,
            gender: gender
        })

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, {image: imageUrl})
        }

        
        res.json({success: true, message: "Profile Updated"})

    } catch (error) {
        console.log(error);
        
        res.json({success: false, message: error.message})
    }
}
const bookAppointment = async (req, res)=>{

}

const listAppointment = async (req, res)=>{

}
const cancelAppointment = async (req, res)=>{

}




export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment}