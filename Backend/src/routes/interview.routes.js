import express from 'express';
import  {authUser} from '../middlewares/auth.middleware.js';
import { generateInterviewReport } from '../services/ai.services.js';
import { uploadMiddleware } from '../middlewares/file.middleware.js';
import { generateInterviewReportController, getAllInterviewReportsController, getInterviewReportByIdController } from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description Generate new interview report on basic of user self description, resume PDF and job description
 * @access Private
 */
interviewRouter.post('/', authUser, uploadMiddleware.single("resume") ,generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authUser, getAllInterviewReportsController)

export default interviewRouter;