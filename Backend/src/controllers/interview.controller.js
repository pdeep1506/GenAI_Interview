import * as pdfParse from 'pdf-parse';
import { generateInterviewReport } from '../services/ai.services.js';

import interviewReportModel from '../../src/models/interviewReport.model.js'

export const generateInterviewReportController = async(req,res)=>{
    

    // const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const resumeResult = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

const resumeText = resumeResult.text;
    const {selfDescription, jobDescription} = req.body

    const interViewReportByAI = await generateInterviewReport({
        resume: resumeText,
        selfDescription: selfDescription,
        jobDescription: jobDescription
    })
    // console.log(interViewReportByAI)
    // console.log(Object.keys(interViewReportByAI));

    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interViewReportByAI
    })

    return res.status(201).json({
         success: true,
        message:"Interview report generated successfully",
        data:{
            interviewReport
        }
    })
}



/**
 * @description Controller to get interview report by interviewId.
 */
export async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

/** 
 * @description Controller to get all interview reports of logged in user.
 */
export async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}
