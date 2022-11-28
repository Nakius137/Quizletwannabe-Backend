"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addCollection_1 = __importDefault(require("../models/queries/addCollection"));
const addWords_1 = __importDefault(require("../models/queries/addWords"));
const addQuiz = (req, res) => {
    const { name, email, words } = req.body;
    (0, addCollection_1.default)(name, email);
    (0, addWords_1.default)(words, name, email);
};
exports.default = addQuiz;
