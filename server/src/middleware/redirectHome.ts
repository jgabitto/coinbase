import { Request, Response, NextFunction } from "express";
import path from "path";

const redirectHome = (req: any, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    res.redirect("/home");
  } else {
    next();
  }
};

export { redirectHome };
