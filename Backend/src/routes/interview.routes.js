import express from 'express';
import  {authUser} from '../middlewares/auth.middleware.js';
import { generateInterviewReport } from '../services/ai.services.js';
import { uploadMiddleware } from '../middlewares/file.middleware.js';
import { generateInterviewReportController } from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description Generate new interview report on basic of user self description, resume PDF and job description
 * @access Private
 */
interviewRouter.post('/', authUser, uploadMiddleware.single("resume") ,generateInterviewReportController)


export default interviewRouter;