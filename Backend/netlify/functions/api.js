const serverless = require("serverless-http");

let handler;

exports.handler = async (event, context) => {
  if (!handler) {
    const { default: app } = await import("../../src/app.js");
    const { connectDB } = await import("../../src/config/connectDB.js");

    await connectDB();

    handler = serverless(app);
  }

  return handler(event, context);
};