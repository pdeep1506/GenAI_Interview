import app from "./src/app.js";
import mongoose from "mongoose";
import { connectDB } from "./src/config/connectDB.js";
import {generateInterviewReport, invokeGeminiAi} from '../Backend/src/services/ai.services.js';

const PORT = process.env.PORT || 3000



connectDB().then(()=>{

    app.listen(PORT, ()=>{
        
        console.log(`Server is running on ${PORT} `)
    })    
})
    


