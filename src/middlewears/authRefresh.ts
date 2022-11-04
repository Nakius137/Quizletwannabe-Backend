import { Response } from "express";
import { CustomRequest } from "../interfaces/@types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkForEnv from "../utilites/checkForEnv";
import generateAccessToken from "../utilites/generateAccess";

dotenv.config();

const autoRefresh = (req: CustomRequest, res: Response, next: Function) => {
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

  const accessToken = generateAccessToken({ id: 1 });

  res.send({ accessToken });
  next();
};

export default autoRefresh;
