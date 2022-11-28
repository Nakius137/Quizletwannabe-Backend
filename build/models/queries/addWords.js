"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const addWords = (words, collectionName, email) => {
    let userIdSql = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let userIdQuery = dbconfig_1.default.query(userIdSql, (err, idResult) => {
        if (err) {
            console.error("Błąd w procesie otrzymania danych");
        }
        const ownerId = idResult["0"]._id;
        let collectionIdSql = `SELECT _id FROM Collection WHERE name = ${dbconfig_1.default.escape(collectionName)} && _ownerId = ${ownerId}`;
        let CollectionIdQuery = dbconfig_1.default.query(collectionIdSql, (err, collectionId) => {
            if (err) {
                console.error("Błąd w procesie otrzymania id kolekcji");
            }
            for (const { Original, Translated } of words) {
                console.log(Original, Translated);
                let insertWordsSql = `INSERT INTO Word VALUES(null, ${collectionId}, ${Original}, ${Translated})`;
                let insertWordsQuery = dbconfig_1.default.query(insertWordsSql, (err, result) => {
                    if (err) {
                        console.log(err);
                        console.error("Błąd w procesie wpisywania słówek");
                    }
                });
            }
        });
    });
};
exports.default = addWords;
