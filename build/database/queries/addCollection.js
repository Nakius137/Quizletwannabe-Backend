"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const addCollection = (req, res) => {
    const email = req.body.email;
    const collectionName = req.body.name;
    const OrgWord = req.body.OrginalContent;
    const TransWord = req.body.TranslatedContent;
    let userIdSql = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let userIdQuery = dbconfig_1.default.query(userIdSql, (err, idResult) => {
        if (err) {
            console.error("Błąd w procesie otrzymania danych");
        }
        const ownerId = idResult["0"]._id;
        let insertCollectionSql = `INSERT INTO Collection VALUES (null, ${ownerId}, ${collectionName})`;
        let insertCollectionQuery = dbconfig_1.default.query(insertCollectionSql, (err, result) => {
            if (err) {
                console.error("Błąd w procesie wpisywania kolekcji");
            }
        });
        let collectionIdSql = `SELECT _id FROM Collection WHERE name = ${name} && _ownerId = ${ownerId}`;
        let CollectionIdQuery = dbconfig_1.default.query(collectionIdSql, (err, collectionId) => {
            if (err) {
                console.error("Błąd w procesie otrzymania id kolekcji");
            }
            let insertWordsSql = `INSERT INTO Word VALUES(null, ${collectionId}, ${OrgWord}, ${TransWord})`;
            let insertWordsQuery = dbconfig_1.default.query(insertWordsSql, (err, result) => {
                if (err) {
                    console.error("Błąd w procesie wpisywania słówek");
                }
            });
        });
    });
};
exports.default = addCollection;
