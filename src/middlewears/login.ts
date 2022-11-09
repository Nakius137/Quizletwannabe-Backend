import { Response } from "express";
import { CustomRequest } from "./../interfaces/@types";
import loginUser from "../database/queries/loginUser";

const login = (req: CustomRequest, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = loginUser(email, password);

  return user;
};

export default login;
