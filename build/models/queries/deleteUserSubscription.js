"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const deleteUserSubscription = (userEmail, quizName) => {
    console.log(quizName);
    let sqlGetCollectionsId = `SELECT _id FROM Collection WHERE name = ${dbconfig_1.default.escape(quizName)}`;
    let getCollectionsId = dbconfig_1.default.query(sqlGetCollectionsId, (err, collectionId) => {
        if (err) {
            console.error(err);
        }
        let sqlgetCollectionsIdInSubs = `SELECT * FROM subscriptions WHERE _collectionId = ${dbconfig_1.default.escape(
        //@ts-ignore
        collectionId[`0`][`_id`])} `;
        let getCollectionsIdInSubs = dbconfig_1.default.query(sqlgetCollectionsIdInSubs, (err, result) => {
            if (err) {
                console.error(err);
            }
            console.log(collectionId);
            console.log(result);
        });
    });
};
exports.default = deleteUserSubscription;
