import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        
        console.log(`\n MongoDB connection established!!
            ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("error occured!!", error);
        process.exit(1);
    }
}