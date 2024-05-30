import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './database/config.js';
import { AuthRouter } from './rotuers/AuthRouter.js';

//Dotenv configuration
dotenv.config()

//Initializing the app
const app = express()


//Configuring middelwares
app.use(cors())
app.use(express.json())

//Connecting to database
connectDatabase()


//Configuring routers
app.use('/api/v1/auth', AuthRouter)


//Setting up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
})