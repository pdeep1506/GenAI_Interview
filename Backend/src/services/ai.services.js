import { GoogleGenAI } from "@google/genai";
import * as z from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';
import dotenv from "dotenv";
dotenv.config();

// console.log("API Key:", process.env.Google_GenAI_API_KEY);
const ai = new GoogleGenAI({

    apiKey: process.env.Google_GenAI_API_KEY
});


export async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
         model: "gemini-3-flash-preview",
        // model: 'gemini-3.1-flash-lite',
        // model: "gemini-2.5-pro",
        // model: "gemini-2.5-flash-lite",
        // model: "gemini-2.5-flash",
        contents: 'Explain what is Interview',
        
    })

    // console.log(response.text);
}

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })
const interviewReportSchema = {
  type: "OBJECT",
  properties: {
    matchScore: {
      type: "NUMBER",
      description: "Score between 0 and 100."
    },

    title: {
      type: "STRING",
      description: "Job title."
    },

    technicalQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: {
            type: "STRING"
          },
          intention: {
            type: "STRING"
          },
          answer: {
            type: "STRING"
          }
        },
        required: [
          "question",
          "intention",
          "answer"
        ]
      }
    },

    behavioralQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: {
            type: "STRING"
          },
          intention: {
            type: "STRING"
          },
          answer: {
            type: "STRING"
          }
        },
        required: [
          "question",
          "intention",
          "answer"
        ]
      }
    },

    skillGaps: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          skill: {
            type: "STRING"
          },
          severity: {
            type: "STRING",
            enum: ["low", "medium", "high"]
          }
        },
        required: [
          "skill",
          "severity"
        ]
      }
    },

    preparationPlan: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          day: {
            type: "NUMBER"
          },
          focus: {
            type: "STRING"
          },
          tasks: {
            type: "ARRAY",
            items: {
              type: "STRING"
            }
          }
        },
        required: [
          "day",
          "focus",
          "tasks"
        ]
      }
    }
  },

  required: [
    "matchScore",
    "title",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan"
  ]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

   

    const prompt = `
        You are an expert technical interviewer.

        Analyze the candidate's resume against the job description.

        Return ONLY JSON that exactly matches the provided response schema.

        Do NOT include markdown.
        Do NOT include additional fields.
        Do NOT omit required fields.

        Generate:

        - matchScore (0-100)
        - title
        - 10 technicalQuestions
        - 8 behavioralQuestions
        - skillGaps
        - 7-day preparationPlan

        Resume:
        ${resume}

        Self Description:
        ${selfDescription}

        Job Description:
        ${jobDescription}
        `;

     
    const response = await ai.models.generateContent({
        //  model: "gemini-3-flash-preview",
         model: 'gemini-3.1-flash-lite',
        // model: "gemini-2.5-pro",
        // model: "gemini-2.5-flash-lite",
        // model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            
             responseMimeType: "application/json",
            responseSchema: interviewReportSchema,
        }

    })
  
    return JSON.parse(response.text)

}



export {generateInterviewReport}

