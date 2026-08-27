import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// All the routes here
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter);


export default app;
