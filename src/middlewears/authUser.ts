import { CustomRequest } from "../interfaces/@types";
import checkForEnv from "../utilites/checkForEnv";
import generateAccessToken from "../utilites/generateAccess";
import jwt from "jsonwebtoken";
import { Response } from "express";

const authUser = (req: CustomRequest, res: Response, next: Function) => {
  const email = req.body.email;
  const password = req.body.password;

  const accessToken = generateAccessToken({ id: 1 });
  // TODO dodanie później aby z bazy danych pobierało
  const refreshToken = jwt.sign(
    { id: 1 },
    checkForEnv(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: 525600,
    }
  );

  res.send({ accessToken, refreshToken });
};

export default authUser;
