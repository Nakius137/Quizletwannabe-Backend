"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const getColecttions = (email, res) => {
    let sqlUserId = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let userIdQuery = dbconfig_1.default.query(sqlUserId, (err, idResult) => {
        if (err) {
            console.error("Błąd w uzyskaniu danych");
        }
        //@ts-ignore
        const userId = idResult["0"]._id;
        let sqlCollection = `SELECT * FROM Subscriptions WHERE _subscriberId = ${userId}`;
        let subscriptionQuery = dbconfig_1.default.query(sqlCollection, (err, subscryptionResult) => {
            if (err) {
                console.log("Błąd w uzyskaniu subskrypcji");
            }
            //@ts-ignore
            if (subscryptionResult.length == 0) {
                console.log("Brak aktualnie zestawów");
            }
            else {
                //@ts-ignore
                const collectionId = subscryptionResult["0"]._collectionId;
                let sqlWords = `SELECT OriginalContent, TranslatedContent FROM Word WHERE _collectionId = ${collectionId}`;
                let sqlCollectionName = `SELECT name FROM Collection WHERE _id = ${collectionId}`;
                let collectionNameQuery = dbconfig_1.default.query(sqlCollectionName, (err, nameResult) => {
                    if (err) {
                        console.error("Błąd w uzyskaniu słowek do kolekcji");
                    }
                    console.log(nameResult);
                });
                let wordsQuery = dbconfig_1.default.query(sqlWords, (err, wordResult) => {
                    if (err) {
                        console.error("Błąd w uzyskaniu słowek do kolekcji");
                    }
                    console.log(wordResult);
                    res === null || res === void 0 ? void 0 : res.send(wordResult);
                });
            }
        });
    });
};
exports.default = getColecttions;
