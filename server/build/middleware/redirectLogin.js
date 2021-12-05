"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectLogin = void 0;
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/login");
    }
    else {
        next();
    }
};
exports.redirectLogin = redirectLogin;
