import express, { Application } from "express";
import dotenv from "dotenv";
import autoRefresh from "./middlewears/auth/refreshToken";
import login from "./controllers/login";
import register from "./controllers/register";
import cors from "cors";
import router from "./controllers/routes/main";

dotenv.config();

const app: Application = express();
const PORT = 5000;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/", router);

app.post("/login", login);
app.post("/register", register);
app.post("/auth/refresh", autoRefresh);

app.listen(PORT, "127.0.0.1", () => {
  console.log(PORT);
});
