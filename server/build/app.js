"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create express object
const app = (0, express_1.default)();
// Secure the connection and data
// app.use(helmet());
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Needed to parse req.body with json payload (Can be used to parse formData obj)
app.use(express_1.default.json());
// Processes data sent from inbuilt form method and action
app.use(express_1.default.urlencoded({ extended: true }));
// Load router module in express app (Pass middleware userRouter to app)
// app.use(userRouter);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("../../public"));
    app.get("*", (req, res) => {
        res.sendFile("../../public/index.html");
    });
}
exports.default = app;
