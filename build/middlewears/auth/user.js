"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkForEnv_1 = __importDefault(require("../../utilites/checkForEnv"));
const generateAccess_1 = __importDefault(require("../../utilites/generateAccess"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const accessToken = (0, generateAccess_1.default)({ id: 1 });
    // TODO dodanie później aby z bazy danych pobierało
    const refreshToken = jsonwebtoken_1.default.sign({ id: 1 }, (0, checkForEnv_1.default)(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: 525600,
    });
    res.send({ accessToken, refreshToken });
};
exports.default = authUser;
