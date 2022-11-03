import { Response } from "express";
import { CustomRequest } from "../interfaces/@types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req: CustomRequest, res: Response, next: Function) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  //@ts-ignore
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    if (typeof req.user !== undefined) {
      //@ts-ignore
      req.user = user;
      next();
    }
  });
};

export default auth;
