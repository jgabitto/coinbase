"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../middleware/auth");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
exports.router = router;
// POST User login
router.post("/signIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find user using email and password
        const user = yield user_1.User.findByCredentials(req.body.email, req.body.password);
        // Generate auth token
        const token = yield user.generateAuthToken();
        // Put JWT in cookie
        res.cookie("auth_token", token, { secure: true, sameSite: "none" });
        res.set({ Authorization: token });
        return res.status(200).send({ message: "Success" });
    }
    catch (e) {
        console.log(e.message);
        return res.status(400).send({ message: e.message });
    }
}));
// POST Create users
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create user from req.body
        const user = new user_1.User(req.body);
        // Generate token for user
        const token = yield user.generateAuthToken();
        // Save user
        yield user.save();
        // Put JWT in cookie
        res.cookie("auth_token", token);
        res.set({ Authorization: token });
        return res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        return res.status(400).send({ message: e.message });
    }
}));
// POST Logout user
router.get("/logout", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear token from cookie
        res.clearCookie("auth_token");
        return res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
}));
// PATCH Update a user by id
router.patch("/updateUser", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // Get updates from form
    const updates = Object.keys(req.body);
    const updatesMade = [];
    let isMatchOld;
    let isMatchNew;
    try {
        if (req.body["oldPassword"] && req.body["oldPassword"] !== "") {
            isMatchOld = yield bcryptjs_1.default.compare(req.body["oldPassword"], user.password);
            isMatchNew = yield bcryptjs_1.default.compare(req.body["password"], user.password);
            if (!isMatchOld) {
                return res
                    .status(400)
                    .send({ message: "Password is incorrect", type: "unsuccessfulOld" });
            }
            if (isMatchNew) {
                return res.status(400).send({
                    message: "Please enter a new password",
                    type: "unsuccessfulNew",
                });
            }
        }
        // Update each property of user that needs to be updated
        updates.forEach((update) => {
            // Check if user property is not the same as the submitted update and non empty
            if (user[update] !== req.body[update] &&
                req.body[update] !== "" &&
                update !== "oldPassword") {
                user[update] = req.body[update];
                updatesMade.push(update);
            }
        });
        if (user.isModified("password") ||
            user.isModified("userName") ||
            user.isModified("email")) {
            yield user.save();
            return res.status(200).send({
                updates: user[updatesMade],
                message: "User was updated successfully!",
                type: "successful",
            });
        }
        if (req.body["email"] !== "")
            return res.status(400).send({
                message: "Please enter a new email or delete email.",
                type: "unsuccessfulEmail",
            });
        if (req.body["userName"] !== "")
            return res.status(400).send({
                message: "Please enter a new username or delete username.",
                type: "unsuccessfulUserName",
            });
    }
    catch (e) {
        if (e.code === 11000) {
            return res.status(400).send({
                message: "Email is already used by another user!",
                type: "unsuccessfulDuplicateEmail",
            });
        }
        return res.status(400).send({ message: e.message });
    }
}));
// DELETE Delete a user by id
router.delete("/remove-user/:id", auth_1.auth, (req, res, next) => {
    try {
        // Create user from req.body
        user_1.User.findByIdAndDelete(req.user.id);
        return res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        return res.status(400).send({ message: e.message });
    }
});
