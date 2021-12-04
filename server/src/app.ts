import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";

import { router } from "./routes/cryptoInfoRoutes";

// Create express object
const app = express();
// Secure the connection and data
// app.use(helmet());
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Needed to parse req.body with json payload (Can be used to parse formData obj)
app.use(express.json());
// Processes data sent from inbuilt form method and action
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
// Load router module in express app (Pass middleware userRouter to app)
app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

export default app;
