import React, { createContext, useState } from 'react'
import {toast} from "react-toastify"
import axios from "axios"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken"): "")

    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [dashData, setDashData] = useState(false)

    // getting all doctors data
    const getAllDoctors = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+"/api/admin/all-doctors", {
                headers: {aToken}
            })

            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // change doctor availablity
    const changeAvailability = async (docId)=>{
        try {
            const {data} = await axios.post(backendUrl+"/api/admin/change-availability", {docId},{
                headers: {aToken}
            })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // all appointments data 
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // cancel appointment
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Admin Dashboard data
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        aToken, setAToken,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        getAllAppointments,
        getDashData,
        cancelAppointment,
        dashData
    }


  return (
    <AdminContext.Provider value={value} >
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider