import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
const app = express()


app.use(express.json())
dotenv.config();

// All the routes here
app.use('/api/auth', authRouter)

export default app;
