import serverless from "serverless-http";

import app from "../../src/app.js";

const handler = async (event, context) => {
  await connectDB();

  return serverless(app)(event, context);
};

export { handler };