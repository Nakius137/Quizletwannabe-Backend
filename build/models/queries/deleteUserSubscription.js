"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../dbconfig"));
const deleteUserSubscription = (userEmail, quizName) => {
    let sqlGetCollectionsId = `SELECT _id FROM Collection WHERE name = ${dbconfig_1.default.escape(quizName)}`;
    let getCollectionsId = dbconfig_1.default.query(sqlGetCollectionsId, (err, collectionId) => {
        if (err) {
            console.error(err);
        }
        else {
            let sqlGetUserId = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(userEmail)}`;
            let getUserId = dbconfig_1.default.query(sqlGetUserId, (err, SubscriberId) => {
                if (err) {
                    console.error(err);
                }
                else {
                    let sqlgetCollectionsIdInSubs = `SELECT * FROM subscriptions WHERE _collectionId = ${dbconfig_1.default.escape(collectionId[`0`][`_id`])} `;
                    let getCollectionsIdInSubs = dbconfig_1.default.query(sqlgetCollectionsIdInSubs, (err, result) => {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            let sqlDeleteSubscription = `DELETE FROM subscriptions WHERE (_collectionId = ${dbconfig_1.default.escape(collectionId[`0`][`_id`])} AND _subscriberId = ${dbconfig_1.default.escape(SubscriberId[`0`][`_id`])})`;
                            let deleteSubscription = dbconfig_1.default.query(sqlDeleteSubscription, (err, result) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};
exports.default = deleteUserSubscription;
