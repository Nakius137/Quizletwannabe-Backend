import express, { Application } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import auth from "./middlewears/auth";
import generateAccessToken from "./utilites/generateAccess";

dotenv.config();

const app: Application = express();

const PORT = 5000;

app.get(
  "/",
  //@ts-ignore
  auth,
  (req, res) => {
    console.log("dziala po zmianach");
    const users = [{ id: 1, name: "Adam" }];

    res.send(users);
  }
);

app.post("/auth", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //@ts-ignore
  const accessToken = generateAccessToken({ id: 1 });

  const refreshToken = jwt.sign(
    { id: 1 },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    {
      expiresIn: 525600,
    }
  );

  res.send({ accessToken, refreshToken });
});

app.post("/auth/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401);
  }

  // TODO: Check if refreshToken exists in DB

  const validToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret
  );

  if (!validToken) {
    return res.status(403);
  }
  //@ts-ignore
  const accessToken = generateAccessToken({ id: 1 });

  res.send({ accessToken });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`dziala na ${PORT}`);
});
