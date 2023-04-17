import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectMongoDB = async () => {
      try {
       // console.log(keys.MONGO_URI)
        const res= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${res.connection.host}`.bgRed);
        
      } catch (error) {
          console.log(error)
      }

}


export default connectMongoDB;