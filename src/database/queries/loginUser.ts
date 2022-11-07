import bcrypt from "bcrypt";
import db from "../dbconfig";

const loginUser = async (email: string, password: string) => {
  const sql = `SELECT password FROM Users WHERE email=${db.escape(email)}`;

  const passwordFromDB = db.query(sql, (err, result) => {
    if (err) {
      console.error("Błąd z baza danych");
    }
    return result;
  });

  if (!email) {
    return alert("Nie ma takiego użytkownika");
  } else {
    //@ts-ignore
    if (bcrypt.compare(password, passwordFromDB)) {
      alert("Zalogownano");
    } else {
      alert("Złe hasło");
    }
  }
};

export default loginUser;
