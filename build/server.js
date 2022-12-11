"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const refreshToken_1 = __importDefault(require("./middlewears/auth/refreshToken"));
const login_1 = __importDefault(require("./controllers/login"));
const register_1 = __importDefault(require("./controllers/register"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./controllers/routes/main"));
const addQuiz_1 = __importDefault(require("./controllers/addQuiz"));
const token_1 = __importDefault(require("./middlewears/auth/token"));
const mailer_1 = __importDefault(require("./controllers/mailer"));
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
app.use("/", main_1.default);
app.post("/login", login_1.default);
app.post("/register", register_1.default);
app.post("/auth/refresh", refreshToken_1.default);
app.post("/addquiz", token_1.default, addQuiz_1.default);
app.post("/passwdfrgt", mailer_1.default);
app.listen(PORT, "127.0.0.1", () => {
    console.log(PORT);
});
