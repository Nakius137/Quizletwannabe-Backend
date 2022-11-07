import { Response } from "express";
import { CustomRequest } from "./../interfaces/@types";
import hashPassword from "../utilites/hashPassword";
import loginUser from "../database/queries/loginUser";

const login = async (req: CustomRequest, res: Response) => {
  const email = req.body.email;
  const password = await hashPassword(req.body.password);

  const user = loginUser(email, password);

  return user;
};

export default login;
