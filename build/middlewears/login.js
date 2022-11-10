"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginUser_1 = __importDefault(require("../database/queries/loginUser"));
const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = (0, loginUser_1.default)(email, password);
    return user;
};
exports.default = login;
