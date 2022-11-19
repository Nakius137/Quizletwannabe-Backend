"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const getColecttions = (email, req, res) => {
    let DBdata = {
        collection: [
            {
                values: {
                    name: "",
                    words: [],
                },
            },
        ],
    };
    let userIdSql = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(email)}`;
    let userIdQuery = dbconfig_1.default.query(userIdSql, (err, idResult) => {
        if (err) {
            console.error("Błąd w uzyskaniu danych");
        }
        const userId = idResult["0"]._id;
        let sqlCollection = `SELECT * FROM Subscriptions WHERE _subscriberId = ${userId}`;
        let subscriptionQuery = dbconfig_1.default.query(sqlCollection, (err, subscryptionResult) => {
            if (err) {
                console.error("Błąd w uzyskaniu subskrypcji");
            }
            if (Array.isArray(subscryptionResult) &&
                subscryptionResult.length == 0) {
                console.error("Brak aktualnie zestawów");
            }
            else {
                const resultsLength = subscryptionResult.length;
                const getCollecttionsId = (resultsLength) => {
                    for (let i = 0; i <= resultsLength; i++) {
                        console.log(subscryptionResult);
                        console.log(subscryptionResult[`0`]);
                        console.log("chuj2 " + subscryptionResult[`${i}`]);
                        const collectionId = subscryptionResult[`${i}`]._collectionId;
                        let sqlWords = `SELECT OriginalContent, TranslatedContent FROM Word WHERE _collectionId = ${collectionId}`;
                        let sqlCollectionName = `SELECT name FROM Collection WHERE _id = ${collectionId}`;
                        let collectionNameQuery = dbconfig_1.default.query(sqlCollectionName, (err, nameResult) => {
                            if (err) {
                                console.error("Błąd w uzyskaniu słowek do kolekcji");
                            }
                            DBdata[`collection`][`${i}`][`values`][`name`] = nameResult[`0`][`name`];
                            // console.log(nameResult[`0`]);
                        });
                        let wordsQuery = dbconfig_1.default.query(sqlWords, (err, wordResult) => {
                            if (err) {
                                console.error("Błąd w uzyskaniu słowek do kolekcji");
                            }
                            DBdata[`collection`][`${i}`][`values`][`words`] =
                                wordResult;
                            return "chuj";
                        });
                    }
                };
                console.log(resultsLength);
                const sendDBdata = getCollecttionsId(resultsLength);
                console.log(sendDBdata);
                res.send(sendDBdata);
            }
        });
    });
};
exports.default = getColecttions;
