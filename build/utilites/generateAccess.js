"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: 86400,
    });
}
exports.default = generateAccessToken;
