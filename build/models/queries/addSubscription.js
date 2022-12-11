"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const addSubscription = (collectionName, email) => {
    let userIdSql = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let userIdQuery = dbconfig_1.default.query(userIdSql, (err, idResult) => {
        if (err) {
            console.error("Błąd w procesie otrzymania danych");
        }
        const ownerId = idResult["0"]._id;
        let collectionIdSql = `SELECT _id FROM Collection WHERE name = ${dbconfig_1.default.escape(collectionName)} && _ownerId = ${ownerId}`;
        let collectionIdQuery = dbconfig_1.default.query(collectionIdSql, (err, collectionId) => {
            collectionId = collectionId[`0`]._id;
            if (err) {
                console.error("Błąd w procesie otrzymania id kolekcji");
            }
            let sqlAddSubscription = `INSERT INTO Subscriptions VALUES (null, ${ownerId}, ${collectionId}) `;
            let addSubscriptionQuery = dbconfig_1.default.query(sqlAddSubscription, (err, result) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    });
};
exports.default = addSubscription;
