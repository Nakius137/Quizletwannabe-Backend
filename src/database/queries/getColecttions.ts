import db from "../dbconfig";
import { Response } from "express";
import { UserRequest, dataObj, queryId } from "../../interfaces/@types";

const getColecttions = (email: string, req: UserRequest, res: Response) => {
  let DBdata: dataObj = {
    collectionName: "",
    words: [],
  };
  let userIdSql = `SELECT _id FROM User WHERE email = ${db.escape(email)}`;
  let userIdQuery = db.query(userIdSql, (err, idResult: queryId) => {
    if (err) {
      console.error("Błąd w uzyskaniu danych");
    }
    const userId = idResult["0"]._id;

    let sqlCollection = `SELECT * FROM Subscriptions WHERE _subscriberId = ${userId}`;
    let subscriptionQuery = db.query(
      sqlCollection,
      (err, subscryptionResult: queryId) => {
        if (err) {
          console.log("Błąd w uzyskaniu subskrypcji");
        }
        if (
          Array.isArray(subscryptionResult) &&
          subscryptionResult.length == 0
        ) {
          console.log("Brak aktualnie zestawów");
        } else {
          const collectionId = subscryptionResult["0"]._collectionId;

          let sqlWords = `SELECT OriginalContent, TranslatedContent FROM Word WHERE _collectionId = ${collectionId}`;
          let sqlCollectionName = `SELECT name FROM Collection WHERE _id = ${collectionId}`;

          let collectionNameQuery = db.query(
            sqlCollectionName,
            (err, nameResult) => {
              if (err) {
                console.error("Błąd w uzyskaniu słowek do kolekcji");
              }
              DBdata[`collectionName`] = nameResult as unknown as string;
            }
          );

          let wordsQuery = db.query(sqlWords, (err, wordResult) => {
            if (err) {
              console.error("Błąd w uzyskaniu słowek do kolekcji");
            }
            DBdata[`words`] = wordResult as unknown as string[];
            res.send(DBdata);
          });
        }
      }
    );
  });
};

export default getColecttions;
