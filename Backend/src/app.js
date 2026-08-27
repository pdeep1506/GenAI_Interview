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
const allowedOrigins = [
  "http://localhost:5173",
  "https://genai-interview.netlify.app",
      "https://genai-hire.netlify.app",
];
app.use(
  cors({
    origin:  allowedOrigins,
    
    credentials: true,
  })
);

// All the routes here
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter);

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working"
    });
});
export default app;
