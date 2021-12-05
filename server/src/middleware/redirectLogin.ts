import { Request, Response, NextFunction } from "express";
import path from "path";

const redirectLogin = (req: any, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

export { redirectLogin };
