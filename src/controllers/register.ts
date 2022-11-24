import { Response } from "express";
import addUserToDB from "../models/queries/addUserToDB";
import hashPassword from "../utilites/hashPassword";
import { UserRequest } from "../interfaces/@types";

const register = (req: UserRequest, res: Response) => {
  const email = req.body.email;
  const password = hashPassword(req.body.password);

  const user = addUserToDB(email, password);

  return user;
};

export default register;
