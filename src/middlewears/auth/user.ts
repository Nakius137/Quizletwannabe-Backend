import { CustomRequest } from "../../interfaces/@types";
import checkForEnv from "../../utilites/checkForEnv";
import generateAccessToken from "../../utilites/generateAccess";
import jwt from "jsonwebtoken";
import { Response } from "express";
import hashPassword from "../../utilites/hashPassword";

const authUser = (req: CustomRequest, res: Response, next: Function) => {
  const email = req.body.email;
  const password = hashPassword(req.body.password);

  const accessToken = generateAccessToken(email);

  const refreshToken = jwt.sign(
    email,
    checkForEnv(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: 525600,
    }
  );

  res.send({ accessToken, refreshToken });
};

export default authUser;
