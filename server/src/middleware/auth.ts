import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import { User } from "../models/user";

const secret = process.env.JWT_SECRET;

const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET || "too bad";
    const token = req.cookies["auth_token"];

    if (!token) {
      throw new Error("Unauthenticated token");
    }

    const decoded: any = jwt.verify(token, secret);

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error("Not registered user");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (e: any) {
    console.log(e.message);
    return res.sendStatus(500);
  }
};

export { auth };
