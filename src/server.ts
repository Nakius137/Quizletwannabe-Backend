import express, { Application } from "express";
import dotenv from "dotenv";
import authToken from "./middlewears/authToken";
import autoRefresh from "./middlewears/authRefresh";
import authUser from "./middlewears/authUser";

dotenv.config();

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  //@ts-ignore
  authToken,
  (req, res) => {
    console.log("dziala po zmianach");
    const users = [{ id: 1, name: "Adam" }];

    res.send(users);
  }
);

app.post(
  "/auth",
  //@ts-ignore
  authUser
);

app.post(
  "/auth/refresh",
  //@ts-ignore
  autoRefresh
);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`dziala na ${PORT}`);
});
