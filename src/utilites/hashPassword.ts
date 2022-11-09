import bcrypt from "bcrypt";

export default function hashPassword(password: string) {
  try {
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  } catch {
    throw Error;
  }
}
