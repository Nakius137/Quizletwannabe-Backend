"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = __importDefault(require("./middlewears/auth/token"));
const refreshToken_1 = __importDefault(require("./middlewears/auth/refreshToken"));
const user_1 = __importDefault(require("./middlewears/auth/user"));
const getColecttions_1 = __importDefault(require("./middlewears/dbQuery/getColecttions"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", 
//@ts-ignore
token_1.default, getColecttions_1.default, (req, res) => {
    console.log("dziala po zmianach");
});
// app.get("/login", login)
// app.get("register", regiser)
app.post("/auth", 
//@ts-ignore
user_1.default);
app.post("/auth/refresh", 
//@ts-ignore
refreshToken_1.default);
app.listen(PORT, "127.0.0.1", () => {
    console.log(`dziala na ${PORT}`);
});
