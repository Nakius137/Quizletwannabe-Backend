import express, { Application, Response } from "express";
import dotenv from "dotenv";
import authToken from "./middlewears/auth/token";
import autoRefresh from "./middlewears/auth/refreshToken";
import getColecttions from "./database/queries/getColecttions";
import { UserRequest } from "./interfaces/@types";
import login from "./middlewears/login";
import register from "./middlewears/register";
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
//@ts-ignore
app.post("/login", login);

app.get(
  "/:email",
  //@ts-ignore
  authToken,
  (req: UserRequest, res: Response) => {
    console.log("w acllbacku " + req.query.email);
    //@ts-ignore
    const userContent = getColecttions(req.query.email, req, res);
  }
);

//@ts-ignore
app.post("/register", register);

app.post(
  "/auth/refresh",
  //@ts-ignore
  autoRefresh
);

app.listen(PORT, "127.0.0.1", () => {
  console.log("działa");
});
