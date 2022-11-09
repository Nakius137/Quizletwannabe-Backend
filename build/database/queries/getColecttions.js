"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const getColecttions = (email) => {
    let sqlUserId = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let query = dbconfig_1.default.query(sqlUserId, (err, result) => {
        if (err) {
            console.error("Błąd w uzyskaniu danych");
        }
        return result;
    });
    console.log(JSON.stringify(query));
    let sqlColecttion = `SELECT * FROM Colecttion WHERE _ownerId = ${query}`;
    let secondQuery = dbconfig_1.default.query(sqlColecttion, (err, result) => {
        if (err) {
            console.log("error");
        }
        return result;
    });
    return secondQuery;
};
exports.default = getColecttions;
