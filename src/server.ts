import express, { Application, Response } from "express";
import dotenv from "dotenv";
import authToken from "./middlewears/auth/token";
import autoRefresh from "./middlewears/auth/refreshToken";
import getColecttions from "./models/queries/getColecttions";
import { UserRequest } from "./interfaces/@types";
import login from "./controllers/login";
import register from "./controllers/register";
import cors from "cors";

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

app.post("/login", login);

app.get("/:email", authToken, (req: UserRequest, res: Response) => {
  if (req.query.email) {
    const userContent = getColecttions(req.query.email as string, res);
  } else {
    throw console.error("Błąd w mainie");
  }
});

app.post("/register", register);

app.post("/auth/refresh", autoRefresh);

app.listen(PORT, "127.0.0.1", () => {
  console.log("działa");
});
