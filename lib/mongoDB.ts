import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectToDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        
        await mongoose.connect(mongoUri);
        console.log("Connect Success");
    } catch (error) {
        console.log("Connect Fails");
        console.log(error);
    }
};

export default connectToDB;