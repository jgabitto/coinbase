"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectHome = void 0;
const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect("/home");
    }
    else {
        next();
    }
};
exports.redirectHome = redirectHome;
