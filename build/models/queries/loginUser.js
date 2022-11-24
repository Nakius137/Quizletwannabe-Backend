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
const loginUser = (email, password, returnToken) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT passwd FROM User WHERE email=${dbconfig_1.default.escape(email)}`;
    const userPasswordVerification = dbconfig_1.default.query(sql, (err, result) => {
        if (err) {
            console.error("Błąd z baza danych");
        }
        else if (!email || (Array.isArray(result) && result.length === 0)) {
            return console.error("Nie ma takiego użytkownika");
        }
        else {
            const hashedPassword = result["0"].passwd;
            if (bcrypt_1.default.compareSync(password, hashedPassword)) {
                returnToken();
            }
            else {
                console.error("Złe hasło");
            }
        }
    });
});
exports.default = loginUser;
