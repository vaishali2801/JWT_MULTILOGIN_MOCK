
import mongoose from "mongoose";

async function connectDB() {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected successfully...!");

    } catch (error) {
        console.log("db failed..",error.message);
        process.exit(1);
    }
}
export default connectDB;