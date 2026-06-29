import * as pdfParse from 'pdf-parse';
import { generateInterviewReport } from '../services/ai.services.js';
// import interviewR from '../../src/models/interviewReport.model.js'
import intervieeReportModel from '../../src/models/interviewReport.model.js'

export const generateInterviewReportController = async(req,res)=>{
    

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {selfDescription, jobDescription} = req.body

    const interViewReportByAI = await generateInterviewReport({
        resume: resumeContent,
        selfDescription: selfDescription,
        jobDescription: jobDescription
    })

    const interviewReport = await intervieeReportModel.create({
        user : req.user.id,
        resume: resumeContent,
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