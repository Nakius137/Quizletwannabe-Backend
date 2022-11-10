import db from "../dbconfig";
import { Response } from "express";
import { CustomRequest } from "../../interfaces/@types";

const getColecttions = (email: string, req: CustomRequest, res: Response) => {
  let sqlUserId = `SELECT _id FROM User WHERE email = ${db.escape(email)}`;

  let userIdQuery = db.query(sqlUserId, (err, idResult) => {
    if (err) {
      console.error("Błąd w uzyskaniu danych");
    }
    //@ts-ignore
    const userId = idResult["0"]._id;

    let sqlCollection = `SELECT * FROM Subscriptions WHERE _subscriberId = ${userId}`;
    let subscriptionQuery = db.query(
      sqlCollection,
      (err, subscryptionResult) => {
        if (err) {
          console.log("Błąd w uzyskaniu subskrypcji");
        }
        //@ts-ignore
        if (subscryptionResult.length == 0) {
          console.log("Brak aktualnie zestawów");
        } else {
          //@ts-ignore
          const collectionId = subscryptionResult["0"]._collectionId;

          let sqlWords = `SELECT OriginalContent, TranslatedContent FROM Word WHERE _collectionId = ${collectionId}`;
          let sqlCollectionName = `SELECT name FROM Collection WHERE _id = ${collectionId}`;

          let collectionNameQuery = db.query(
            sqlCollectionName,
            (err, nameResult) => {
              if (err) {
                console.error("Błąd w uzyskaniu słowek do kolekcji");
              }
            }
          );

          let wordsQuery = db.query(sqlWords, (err, wordResult) => {
            if (err) {
              console.error("Błąd w uzyskaniu słowek do kolekcji");
            }
            res.send(wordResult);
          });
        }
      }
    );
  });
};

export default getColecttions;
