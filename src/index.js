const dotenv = require("dotenv");
dotenv.config();
const { connectDatabase } = require("./database/connect");
require("./modules/express");

const startServer = async () => {
  await connectDatabase();
};

startServer();
