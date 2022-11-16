import { Response } from "express";
import { UserRequest } from "./../interfaces/@types";
import loginUser from "../database/queries/loginUser";
import authUser from "./auth/user";

const login = (req: UserRequest, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const returnToken = () => {
    authUser(req, res);
  };
  const user = loginUser(email, password, returnToken);

  return user;
};

export default login;
