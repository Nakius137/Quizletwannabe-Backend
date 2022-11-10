"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkForEnv_1 = __importDefault(require("../../utilites/checkForEnv"));
dotenv_1.default.config();
const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, (0, checkForEnv_1.default)(process.env.TOKEN_SECRET), (err, user) => {
        if (err)
            return res.sendStatus(403);
        if (user) {
            next();
        }
    });
};
exports.default = authToken;
