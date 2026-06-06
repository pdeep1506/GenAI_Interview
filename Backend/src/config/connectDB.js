import mongoose from "mongoose"

export const connectDB = async()=>{
    try{

       await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DB connected successfully")
    })
    }
    catch(error){
        console.log(`Error in connecting DB :- ${error}`)
         process.exit(1);
    }
}
