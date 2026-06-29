import mongoose from 'mongoose';

/**
 * 
 * Job description schema : String
 * resume text : String
 * self description : String
 * 
 * 
 * - matchScore : Number
 *      
 * 
 *      
 * - Technical questions - 
 *      [{
 *      question : "",
 *      intention : "",
 *      answer : "",
 *      }]
 * - Behavioral questions - 
 *      [{
 *      question : "",
 *      intention : "",
 *      answer : "",
 *      }]
 * - Skill gaps - 
 *      [{
 *      skill: "",
 *      severity: {
 *          type: String,
 *           enum : ["low", "medium", "high"]
 *      }
 *      }]
 * - Preparation plan - 
 *      [{
 *          day : Number,
 *          focus : String,
 *          task : [String]
 *      }]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, "Technical question is required."]
    },
    intention:{
        type: String,
        required: [true, "Intention is required."]
    },
    answer:{
        type: String,
        required: [true, "Answer is required."]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
     question:{
        type: String,
        required: [true, "Technical question is required."]
    },
    intention:{
        type: String,
        required: [true, "Intention is required."]
    },
    answer:{
        type: String,
        required: [true, "Answer is required."]
    }
}, {
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required :[ true, "Skill is required"]
    },
    severity:{
        type: String,
        enum: ["low", "medium", "high"],
        required : [true, "Severity is required"]
    }
},
{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true, "Day is required."]
    },
    focus: {
        type: String,
        required: [true, "Focus is required."]
    },
    tasks : [{
        type: String,
        required : [true, "Task is required."]
    }]
})

const invterviewReportSchema = new mongoose.Schema({
    jobDescription :{
        required: [true, "Job description is required."],
        type: String
    },
    resume :{
        type: String
    },
    selfDescription:{
        type: String
    },
    matchScore:{
        type: Number,
        min:0,
        max: 100
    },
    technicalQuestion:[
        technicalQuestionSchema
    ],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    }

},{timestamps: true});


const interviewReportModel = mongoose.model("InterviewReport", invterviewReportSchema);

export default interviewReportModel;