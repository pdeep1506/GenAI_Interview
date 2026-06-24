import app from "./src/app.js";
import mongoose from "mongoose";
import { connectDB } from "./src/config/connectDB.js";
import {invokeGeminiAi} from '../Backend/src/services/ai.services.js';

const PORT = process.env.PORT || 3000

invokeGeminiAi()

connectDB().then(()=>{

    app.listen(PORT, ()=>{
        
        console.log(`Server is running on ${PORT} `)
    })    
})
    


