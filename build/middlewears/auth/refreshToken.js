"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkForEnv_1 = __importDefault(require("../../utilites/checkForEnv"));
const generateAccess_1 = __importDefault(require("../../utilites/generateAccess"));
dotenv_1.default.config();
const autoRefresh = (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(401);
    }
    const validToken = jsonwebtoken_1.default.verify(refreshToken, (0, checkForEnv_1.default)(process.env.REFRESH_TOKEN_SECRET));
    if (!validToken) {
        return res.status(403);
    }
    const accessToken = (0, generateAccess_1.default)({ id: 1 });
    res.send({ accessToken });
    next();
};
exports.default = autoRefresh;
