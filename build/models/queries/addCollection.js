"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const addCollection = (collectionName, email) => {
    let userIdSql = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let userIdQuery = dbconfig_1.default.query(userIdSql, (err, idResult) => {
        if (err) {
            console.error("Błąd w procesie otrzymania danych");
        }
        const ownerId = idResult["0"]._id;
        let insertCollectionSql = `INSERT INTO Collection VALUES (null, ${ownerId}, ${dbconfig_1.default.escape(collectionName)})`;
        let insertCollectionQuery = dbconfig_1.default.query(insertCollectionSql, (err, result) => {
            if (err) {
                console.error("Błąd w procesie wpisywania kolekcji");
            }
        });
    });
};
exports.default = addCollection;
