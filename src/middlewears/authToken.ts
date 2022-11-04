import { Response } from "express";
import { CustomRequest } from "../interfaces/@types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkForEnv from "../utilites/checkForEnv";

dotenv.config();

const authToken = (req: CustomRequest, res: Response, next: Function) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, checkForEnv(process.env.TOKEN_SECRET), (err, user) => {
    if (err) return res.sendStatus(403);

    if (user) {
      console.log(req.user);
      next();
    }
  });
};

export default authToken;
