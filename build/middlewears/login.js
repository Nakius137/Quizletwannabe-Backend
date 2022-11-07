"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbconfig_1 = __importDefault(require("../database/dbconfig"));
const hashPassword_1 = __importDefault(require("../utilites/hashPassword"));
const login = (req, res) => {
    const email = req.body.email;
    const password = (0, hashPassword_1.default)(req.body.password);
    const sql = `SELECT password FROM Users WHERE email=${dbconfig_1.default.escape(email)}`;
    const passwordFromDB = dbconfig_1.default.query(sql, (err, result) => {
        if (err) {
            // res.status(500);
            // res.send(err.message);
            console.log("error");
        }
        // res.status(200);
        // res.send(result);
        console.log(result);
    });
    if (!email) {
        return res.status(400).send("Nie ma takiego użytkownika");
    }
    try {
        //@ts-ignore
        if (yield bcrypt_1.default.compare(password, passwordFromDB)) {
            res.send(alert("Zalogownano"));
        }
        else {
            res.send("Złe hasło");
        }
    }
    catch (_a) {
        res.status(500).send();
    }
};
exports.default = login;
