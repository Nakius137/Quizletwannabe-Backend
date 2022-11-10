"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const addUserToDB = (email, password) => {
    let sql = `INSERT INTO User(_id, email, passwd) VALUES (null, ${dbconfig_1.default.escape(email)}, "${password}")`;
    let query = dbconfig_1.default.query(sql, (err, result) => {
        if (err) {
            console.error("Błąd w wpisaniu do bazy danych");
        }
    });
    return query;
};
exports.default = addUserToDB;
