import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {mongoConfig} from './settings.js';

dotenv.config();
const connectionString = `${mongoConfig.serverUrl}${mongoConfig.database}`;

console.log(`Connecting to MongoDB at: ${connectionString}`);

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        });
    } catch (error) {
        console.log('====================================');
        console.log('Error connecting to MongoDB: ', error);
        console.log('====================================');

        process.exit(1);
    }
};

export default connectDB;