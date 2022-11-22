"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = __importDefault(require("./middlewears/auth/token"));
const refreshToken_1 = __importDefault(require("./middlewears/auth/refreshToken"));
const getColecttions_1 = __importDefault(require("./database/queries/getColecttions"));
const login_1 = __importDefault(require("./middlewears/login"));
const register_1 = __importDefault(require("./middlewears/register"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.post("/login", login_1.default);
app.get("/:email", token_1.default, (req, res) => {
    if (req.query.email) {
        const userContent = (0, getColecttions_1.default)(req.query.email, res);
    }
    else {
        throw console.error("Błąd w mainie");
    }
});
app.post("/register", register_1.default);
app.post("/auth/refresh", refreshToken_1.default);
app.listen(PORT, "127.0.0.1", () => {
    console.log("działa");
});
