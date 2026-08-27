import serverless from "serverless-http";
import app from "../../src/app.js";
import { connectDB } from "../../src/config/connectDB.js";

const expressHandler = serverless(app);

export const handler = async (event, context) => {
  await connectDB();

  return expressHandler(event, context);
};