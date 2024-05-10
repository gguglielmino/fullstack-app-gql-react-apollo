import { config } from 'dotenv';
import { mongoose } from 'mongoose';

//config()
config();

export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
}