import bcrypt from "bcrypt";
import { queryId } from "../../interfaces/@types";
import db from "../dbconfig";

const loginUser = async (
  email: string,
  password: string,
  returnToken: Function
) => {
  const sql = `SELECT passwd FROM user WHERE email=${db.escape(email)}`;
  const userPasswordVerification = db.query(sql, (err, result: queryId) => {
    if (err) {
      console.error("Błąd z baza danych");
    } else if (!email || (Array.isArray(result) && result.length === 0)) {
      return console.error("Nie ma takiego użytkownika");
    } else {
      const hashedPassword = result["0"].passwd as unknown as string;
      if (bcrypt.compareSync(password, hashedPassword)) {
        returnToken();
      } else {
        console.error("Złe hasło");
      }
    }
  });
};

export default loginUser;
