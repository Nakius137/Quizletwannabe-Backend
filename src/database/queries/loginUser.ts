import bcrypt from "bcrypt";
import db from "../dbconfig";

const loginUser = async (
  email: string,
  password: string,
  returnToken: Function
) => {
  const sql = `SELECT passwd FROM User WHERE email=${db.escape(email)}`;
  const userPasswordVerification = db.query(sql, (err, result) => {
    if (err) {
      console.error("Błąd z baza danych");
      //@ts-ignore
    } else if (!email || result.length === 0) {
      console.log(email);
      return console.error("Nie ma takiego użytkownika");
    } else {
      //@ts-ignore
      console.log(result);
      //@ts-ignore
      const hashedPassword = result["0"].passwd as string;
      if (bcrypt.compareSync(password, hashedPassword)) {
        returnToken();
        console.log(email + ", " + password);
      } else {
        console.log("Złe hasło");
      }
    }
  });
};

export default loginUser;
