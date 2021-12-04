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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET get crypto information
router.get("/prices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Grab all the recipes from the db
    const recipesData = req.user.recipes;
    // Create an array of each recipe from data
    const recipes = recipesData.map((obj) => {
        // Get the recipe from each obj and parse JSON string
        obj = JSON.parse(obj.recipe);
        return obj;
    });
    res.status(200).send(recipes);
}));
