import express, { Application, Response } from "express";
import dotenv from "dotenv";
import authToken from "./middlewears/auth/token";
import autoRefresh from "./middlewears/auth/refreshToken";
import authUser from "./middlewears/auth/user";
import getColecttions from "./database/queries/getColecttions";
import { CustomRequest } from "./interfaces/@types";
import login from "./middlewears/login";
import register from "./middlewears/register";

dotenv.config();

const app: Application = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
  "/",
  //@ts-ignore
  authToken,
  (req: CustomRequest, res: Response) => {
    const postman = getColecttions(req.body.email, req, res);
  }
);
//@ts-ignore
app.get("/login", login);
//@ts-ignore
app.post("/register", register);

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

app.listen(PORT, "127.0.0.1", () => {
  console.log("działa");
});
