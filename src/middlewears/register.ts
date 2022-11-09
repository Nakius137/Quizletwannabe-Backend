import { Response } from "express";
import addUserToDB from "../database/queries/addUserToDB";
import hashPassword from "../utilites/hashPassword";
import { CustomRequest } from "./../interfaces/@types";

const register = (req: CustomRequest, res: Response) => {
  const email = req.body.email;
  const password = hashPassword(req.body.password);

  const user = addUserToDB(email, password);

  return user;
};

export default register;
