import express, { Application } from "express";
import dotenv from "dotenv";
import authToken from "./middlewears/auth/token";
import autoRefresh from "./middlewears/auth/refreshToken";
import authUser from "./middlewears/auth/user";
import getColecttions from "./database/queries/getColecttions";
import { CustomRequest } from "./interfaces/@types";

dotenv.config();

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  //@ts-ignore
  authToken,
  (req: CustomRequest, res: Response) => {
    getColecttions(req.body.email);
  }
);

// app.get("/login", login);

// app.get("register", regiser)

app.post(
  "/auth",
  //@ts-ignore
  authUser
);

app.post(
  "/auth/refresh",
  //@ts-ignore
  autoRefresh
);
