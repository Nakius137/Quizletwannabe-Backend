"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../database/dbconfig"));
const hashPassword_1 = __importDefault(require("../utilites/hashPassword"));
const register = (req, res) => {
    const password = (0, hashPassword_1.default)(req.body.password);
    let sql = `INSERT INTO User VALUES (null,${dbconfig_1.default.escape(req.body.email)},${password})`;
    let query = dbconfig_1.default.query(sql, (err, result) => {
        if (err) {
            // res.status(500);
            // res.send(err.message);
            console.log("error");
        }
        // res.status(200);
        // res.send(result);
        console.log(result);
    });
};
exports.default = register;
