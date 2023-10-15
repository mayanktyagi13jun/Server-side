import express from "express";
import { PORT } from "./config/environment.js";
import { expressApp } from "./express-app.js";
import connectToDB from "./config/connection.js";

const startServer = async () => {
  const server = express();
  await expressApp(server);
  await connectToDB();
  server
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};

startServer();
