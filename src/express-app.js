import express from "express";
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";

export async function expressApp(app) {

  // Development logging
  if(process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));

  
// Api Routes
  app.use("/api/v1/user/", userRoutes);
  app.all('*', (req, res) => {
    res.status(404).send({ status: 'fail', message: `Can not find ${req.originalUrl} on this Server!`});
  });
}
