import bcrypt from "bcrypt";
import db from "../dbconfig";

const loginUser = async (email: string, password: string) => {
  const sql = `SELECT passwd FROM User WHERE email=${db.escape(email)}`;
  const userPasswordVerification = db.query(sql, (err, result) => {
    if (err) {
      console.error("Błąd z baza danych");
    } else {
      if (!email) {
        return console.error("Nie ma takiego użytkownika");
      } else {
        //@ts-ignore
        const hashedPassword = result["0"].passwd as string;
        console.log(hashedPassword, " ", password);
        if (bcrypt.compareSync(password, hashedPassword)) {
          console.log("Zalogownano");
        } else {
          console.log("Złe hasło");
        }
      }
    }
  });
};

export default loginUser;
