import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
const app = express()


app.use(express.json())
dotenv.config();
app.use(cookieParser())

// All the routes here
app.use('/api/auth', authRouter)

export default app;
