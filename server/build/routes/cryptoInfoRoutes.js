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
const axios_1 = __importDefault(require("axios"));
const routes_1 = require("./routes");
const router = (0, express_1.Router)();
exports.router = router;
// GET get prices data information
router.get("/get-prices-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(routes_1.GET_PRICES_DATA_URL);
        res.status(200).send(response.data);
    }
    catch (e) {
        console.log(e);
    }
}));
// POST get line chart information
router.post("/get-line-chart-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = (0, routes_1.getLineChartDataUrl)(req.body.data.id);
        const response = yield axios_1.default.get(url);
        res.status(200).send(response.data);
    }
    catch (e) {
        console.log(e);
    }
}));
