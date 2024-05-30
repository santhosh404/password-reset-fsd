import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


const DATABASE_URL = process.env.DATABASE_URL;


const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(DATABASE_URL);
        console.log('Database connected successfully!');
    }

    catch(err) {
        console.error('Error connecting to the database', err.message);
    }
}

export default connectDatabase;