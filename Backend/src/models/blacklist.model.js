import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [true, "Token is required to be added in blacklist."]
    }
},{timestamps:true});


const blacklistTokenModel = mongoose.model('blacklistToken', blacklistTokenSchema);

export default blacklistTokenModel;