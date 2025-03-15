import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://customercraft10:${process.env.MONGODB_PASS}@bookmydoc.jt4js.mongodb.net/?retryWrites=true&w=majority&appName=bookmydoc`)
        await mongoose.connection.on('connected', () => console.log("Database Connected"))

    } catch (error) {
        console.log(error);
    }
}


export {connectDB}