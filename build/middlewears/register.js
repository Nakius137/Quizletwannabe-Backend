"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addUserToDB_1 = __importDefault(require("../database/queries/addUserToDB"));
const hashPassword_1 = __importDefault(require("../utilites/hashPassword"));
const register = (req, res) => {
    const email = req.body.email;
    const password = (0, hashPassword_1.default)(req.body.password);
    const user = (0, addUserToDB_1.default)(email, password);
    return user;
};
exports.default = register;
