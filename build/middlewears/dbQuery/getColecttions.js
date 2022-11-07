"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = __importDefault(require("../../database/dbconfig"));
const getColecttions = (req, res, next) => {
    let sqlUserId = `SELECT _id FROM User WHERE email = ${dbconfig_1.default.escape(req.body.email)}`;
    let sqlColecctionName = `SELECT name FROM Colecttion WHERE _ownerId = ${sqlUserId}`;
    // let query = db.query(sqlId, (err, result) => {
    //   if (err) {
    //     // res.status(500);
    //     // res.send(err.message);
    //     console.log("error");
    //   }
    //   // res.status(200);
    //   // res.send(result);
    //   console.log(result);
    // });
    next();
};
exports.default = getColecttions;
