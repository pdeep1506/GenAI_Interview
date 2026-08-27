const serverless = require("serverless-http");

let appHandler;

exports.handler = async (event, context) => {
    if (!appHandler) {
        const { default: app } = await import("../../src/app.js");
        appHandler = serverless(app);
    }

    return appHandler(event, context);
};
