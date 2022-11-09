"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbconfig_1 = __importDefault(require("../dbconfig"));
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT passwd FROM User WHERE email=${dbconfig_1.default.escape(email)}`;
    console.log(sql);
    const passwordFromDB = dbconfig_1.default.query(sql, (err, result) => {
        if (err) {
            console.error("Błąd z baza danych");
        }
        return result;
    });
    if (!email) {
        return console.error("Nie ma takiego użytkownika");
    }
    else {
        //@ts-ignore
        if (bcrypt_1.default.compare(password, passwordFromDB)) {
            console.log("Zalogownano");
        }
        else {
            console.log("Złe hasło");
        }
    }
});
exports.default = loginUser;
