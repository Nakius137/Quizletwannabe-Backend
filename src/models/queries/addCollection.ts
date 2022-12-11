import { queryId } from "../../interfaces/@types";
import db from "../dbconfig";

const addCollection = (collectionName: string, email: string) => {
  let userIdSql = `SELECT _id FROM user WHERE email = ${db.escape(email)}`;
  let userIdQuery = db.query(userIdSql, (err, idResult: queryId) => {
    if (err) {
      console.error("Błąd w procesie otrzymania danych");
    }
    const ownerId = idResult["0"]._id;

    let insertCollectionSql = `INSERT INTO collection VALUES (null, ${ownerId}, ${db.escape(
      collectionName
    )})`;
    let insertCollectionQuery = db.query(insertCollectionSql, (err, result) => {
      if (err) {
        console.error("Błąd w procesie wpisywania kolekcji");
      }
    });
  });
};
export default addCollection;
