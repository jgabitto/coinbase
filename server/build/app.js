"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const CryptoInfoController_1 = require("./controllers/CryptoInfoController");
const UserController_1 = require("./controllers/UserController");
require("./db/mongoose");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: true }));
app.use(CryptoInfoController_1.router);
app.use(UserController_1.router);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
    });
}
exports.default = app;
