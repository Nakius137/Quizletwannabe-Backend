import express, { Response } from "express";
import authToken from "../../middlewears/auth/token";
import getColecttions from "../../models/queries/getColecttions";
import { UserRequest } from "../../interfaces/@types";
import deleteUserSubscription from "../../models/queries/deleteUserSubscription";

const router = express.Router();

router.get("/:email", authToken, (req: UserRequest, res: Response) => {
  if (req.query.email) {
    getColecttions(req.query.email as string, res);
  } else {
    throw console.error("Błąd w mainie");
  }
});

router.post("/", authToken, (req: UserRequest, res: Response) => {
  const { quizName, userEmail } = req.body;
  if (quizName && userEmail) {
    deleteUserSubscription(userEmail, quizName);
  } else {
    throw console.error("Błąd w postcie main");
  }
});

export default router;
