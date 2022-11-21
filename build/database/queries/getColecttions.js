"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const getColecttions = (email, req, res) => {
    let userIdSql = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let userIdQuery = dbconfig_1.default.query(userIdSql, (err, idResult) => {
        if (err) {
            console.error("Błąd w uzyskaniu danych");
        }
        const userId = idResult["0"]._id;
        let sqlCollection = `SELECT * FROM Subscriptions WHERE _subscriberId = ${userId}`;
        let subscriptionQuery = dbconfig_1.default.query(sqlCollection, (err, subscryptionResult) => {
            if ((Array.isArray(subscryptionResult) &&
                subscryptionResult.length == 0) ||
                err) {
                console.error("Brak aktualnie zestawów");
            }
            else {
                const resultsLength = subscryptionResult.length;
                const pushCollections = (resultsLength) => {
                    let DBdata = {
                        collection: [],
                    };
                    for (let i = 0; i < resultsLength; i++) {
                        const collectionId = subscryptionResult[`${i}`][`_collectionId`];
                        let sqlWords = `SELECT OriginalContent, TranslatedContent FROM Word WHERE _collectionId = ${collectionId}`;
                        let sqlCollectionName = `SELECT name FROM Collection WHERE _id = ${collectionId}`;
                        console.log(sqlCollectionName);
                        let collectionNameQuery = dbconfig_1.default.query(sqlCollectionName, (err, nameResult) => {
                            if (err) {
                                console.error("Błąd w uzyskaniu słowek do kolekcji");
                            }
                            let wordsQuery = dbconfig_1.default.query(sqlWords, (err, wordResult) => {
                                if (err) {
                                    console.error("Błąd w uzyskaniu słowek do kolekcji");
                                }
                                console.log(nameResult);
                                console.log(wordResult);
                                DBdata.collection.push({
                                    values: {
                                        name: nameResult,
                                        words: [wordResult],
                                    },
                                });
                            });
                        });
                    }
                    return DBdata;
                };
                const sendDBdata = pushCollections(resultsLength);
                console.log(sendDBdata);
                res.send(sendDBdata);
                console.log("jyrwa");
            }
        });
    });
};
exports.default = getColecttions;
