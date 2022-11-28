import { queryId } from "../../interfaces/@types";
import db from "../dbconfig";

const addWords = (words: any, collectionName: string, email: string) => {
  let userIdSql = `SELECT _id FROM User WHERE email = ${db.escape(email)}`;
  let userIdQuery = db.query(userIdSql, (err, idResult: queryId) => {
    if (err) {
      console.error("Błąd w procesie otrzymania danych");
    }
    const ownerId = idResult["0"]._id;

    let collectionIdSql = `SELECT _id FROM Collection WHERE name = ${db.escape(
      collectionName
    )} && _ownerId = ${ownerId}`;
    let CollectionIdQuery = db.query(
      collectionIdSql,
      (err, collectionId: queryId) => {
        collectionId = collectionId[`0`]._id;
        if (err) {
          console.error("Błąd w procesie otrzymania id kolekcji");
        }
        for (const { Original, Translated } of words) {
          let insertWordsSql = `INSERT INTO Word VALUES(null, ${collectionId}, "${Original}", "${Translated}")`;
          let insertWordsQuery = db.query(insertWordsSql, (err, result) => {
            if (err) {
              console.error("Błąd w procesie wpisywania słówek");
            }
          });
        }
      }
    );
  });
};
export default addWords;
