import * as pdfParse from 'pdf-parse';
import { generateInterviewReport } from '../services/ai.services.js';
// import interviewR from '../../src/models/interviewReport.model.js'
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