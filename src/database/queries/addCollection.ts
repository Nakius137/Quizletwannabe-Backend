import { CollectionRequest } from "../../interfaces/@types";
import db from "../dbconfig";

const addCollection = (req: CollectionRequest, res: Response) => {
  const email = req.body.email;
  const collectionName = req.body.name;
  const OrgWord = req.body.OrginalContent;
  const TransWord = req.body.TranslatedContent;

  let userIdSql = `SELECT _id FROM User WHERE email = ${db.escape(email)}`;

  let userIdQuery = db.query(userIdSql, (err, idResult) => {
    if (err) {
      console.error("Błąd w procesie otrzymania danych");
    }
    //@ts-ignore
    const ownerId = idResult["0"]._id;

    let insertCollectionSql = `INSERT INTO Collection VALUES (null, ${ownerId}, ${collectionName})`;

    let insertCollectionQuery = db.query(insertCollectionSql, (err, result) => {
      if (err) {
        console.error("Błąd w procesie wpisywania kolekcji");
      }
    });

    let collectionIdSql = `SELECT _id FROM Collection WHERE name = ${name} && _ownerId = ${ownerId}`;

    let CollectionIdQuery = db.query(collectionIdSql, (err, collectionId) => {
      if (err) {
        console.error("Błąd w procesie otrzymania id kolekcji");
      }
      let insertWordsSql = `INSERT INTO Word VALUES(null, ${collectionId}, ${OrgWord}, ${TransWord})`;

      let insertWordsQuery = db.query(insertWordsSql, (err, result) => {
        if (err) {
          console.error("Błąd w procesie wpisywania słówek");
        }
      });
    });
  });
};
export default addCollection;
