import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";

import { router as CryptoInfoController } from "./controllers/CryptoInfoController";
import { router as UserController } from "./controllers/UserController";
import "./db/mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(CryptoInfoController);
app.use(UserController);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../../client/build")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

export default app;
