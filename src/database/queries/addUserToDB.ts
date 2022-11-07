import db from "../dbconfig";

const addUserToDB = (email: string, password: string) => {
  let sql = `INSERT INTO User VALUES (null,${db.escape(email)},${password})`;

  let query = db.query(sql, (err, result) => {
    if (err) {
      console.error("Błąd w wpisaniu do bazy danych");
    }
    return result;
  });
  return query;
};

export default addUserToDB;
