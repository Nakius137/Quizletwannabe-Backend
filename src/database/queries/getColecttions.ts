import db from "../dbconfig";
import { Response } from "express";
import { UserRequest, dataObj, queryId } from "../../interfaces/@types";

const getColecttions = (email: string, req: UserRequest, res: Response) => {
  let DBdata: dataObj = {
    collection: [
      {
        values: {
          name: "",
          words: [],
        },
      },
    ],
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
          console.error("Błąd w uzyskaniu subskrypcji");
        }
        if (
          Array.isArray(subscryptionResult) &&
          subscryptionResult.length == 0
        ) {
          console.error("Brak aktualnie zestawów");
        } else {
          const resultsLength = subscryptionResult.length;
          const getCollecttionsId = (resultsLength: number) => {
            for (let i = 0; i <= resultsLength; i++) {
              console.log(subscryptionResult);
              console.log(subscryptionResult[`0`]);
              console.log("indeks to " + `${i}`);
              console.log(subscryptionResult[`${i}`]);
              console.log("chuj2 " + subscryptionResult[`${i}`]);

              const collectionId = subscryptionResult[`${i}`][`_collectionId`];
              let sqlWords = `SELECT OriginalContent, TranslatedContent FROM Word WHERE _collectionId = ${collectionId}`;
              let sqlCollectionName = `SELECT name FROM Collection WHERE _id = ${collectionId}`;

              let collectionNameQuery = db.query(
                sqlCollectionName,
                (err, nameResult: queryId) => {
                  if (err) {
                    console.error("Błąd w uzyskaniu słowek do kolekcji");
                  }
                  DBdata[`collection`][`${i}`][`values`][`name`] = nameResult[
                    `0`
                  ][`name`] as unknown as string;
                }
              );
              let wordsQuery = db.query(sqlWords, (err, wordResult) => {
                if (err) {
                  console.error("Błąd w uzyskaniu słowek do kolekcji");
                }
                DBdata[`collection`][`${i}`][`values`][`words`] =
                  wordResult as unknown as string;
                return "chuj";
              });
            }
          };
          console.log(resultsLength);
          const sendDBdata = getCollecttionsId(resultsLength);
          console.log(sendDBdata);
          res.send(sendDBdata);
        }
      }
    );
  });
};

export default getColecttions;
