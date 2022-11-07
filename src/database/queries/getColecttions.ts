import db from "../dbconfig";

const getColecttions = (email: string) => {
  let sqlUserId = `SELECT _id FROM User WHERE email = ${db.escape(email)}`;

  let query = db.query(sqlUserId, (err, result) => {
    if (err) {
      console.error("Błąd w uzyskaniu danych");
    }
    return result;
  });

  let sqlColecttion = `SELECT * FROM Colecttion WHERE _ownerId = ${query}`;

  let secondQuery = db.query(sqlColecttion, (err, result) => {
    if (err) {
      console.log("error");
    }
    console.log(result);
    return result;
  });

  return secondQuery;
};

export default getColecttions;
