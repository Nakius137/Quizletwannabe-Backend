import { Response } from "express";
import { UserRequest } from "../interfaces/@types";
import addCollection from "../models/queries/addCollection";
import addSubscription from "../models/queries/addSubscription";
import addWords from "../models/queries/addWords";

const addQuiz = (req: UserRequest, res: Response) => {
  const { name, email, words } = req.body;

  addCollection(name, email);
  addSubscription(name, email);
  addWords(words, name, email);
};

export default addQuiz;
