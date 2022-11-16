import { Response } from "express";
import { UserRequest } from "../../interfaces/@types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkForEnv from "../../utilites/checkForEnv";
import generateAccessToken from "../../utilites/generateAccess";

dotenv.config();

const autoRefresh = (req: UserRequest, res: Response, next: Function) => {
  const email = req.body.email;
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401);
  }

  const validToken = jwt.verify(
    refreshToken,
    checkForEnv(process.env.REFRESH_TOKEN_SECRET)
  );

  if (!validToken) {
    return res.status(403);
  }

  const accessToken = generateAccessToken(email);

  res.send({ accessToken });
  next();
};

export default autoRefresh;
