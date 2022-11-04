import jwt, { Secret } from "jsonwebtoken";

export default function generateAccessToken(payload: object) {
  return jwt.sign(payload, process.env.TOKEN_SECRET as Secret, {
    expiresIn: 86400,
  });
}
