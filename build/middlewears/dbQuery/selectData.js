"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../../database/dbconfig"));
const select = (req, res, next) => {
    let sql = "SELECT * FROM User";
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
    next();
};
exports.default = select;
