"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./middlewears/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
app.get("/", 
//@ts-ignore
auth_1.default, (req, res) => {
    console.log("dziala po zmianach");
    const users = [{ id: 1, name: "Adam" }];
    res.send(users);
});
app.post("/auth", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //@ts-ignore
    const accessToken = jsonwebtoken_1.default.sign({ id: 1 }, process.env.TOKEN_SECRET, {
        expiresIn: 86400,
    });
    //@ts-ignore
    const refreshToken = jsonwebtoken_1.default.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 525600,
    });
    res.send({ accessToken, refreshToken });
});
app.listen(PORT, "127.0.0.1", () => {
    console.log(`dziala na ${PORT}`);
});
