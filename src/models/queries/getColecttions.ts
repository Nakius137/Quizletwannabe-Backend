import db from "../dbconfig";
import { Response } from "express";
import { dataObj, queryId, wordsArray } from "../../interfaces/@types";

const getColecttions = (email: string, res: Response) => {
  try {
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
          if (
            (Array.isArray(subscryptionResult) &&
              subscryptionResult.length == 0) ||
            err
          ) {
            console.error("Brak aktualnie zestawów");
          } else {
            const resultsLength = subscryptionResult.length;

            const pushCollections = (resultsLength: number) => {
              let DBdata: dataObj = {
                collection: [],
              };
              let endOfIteration = 1;
              for (let i = 0; i < resultsLength; i++) {
                const collectionId =
                  subscryptionResult[`${i}`][`_collectionId`];
                let sqlWords = `SELECT OriginalContent, TranslatedContent FROM Word WHERE _collectionId = ${collectionId}`;
                let sqlCollectionName = `SELECT name FROM Collection WHERE _id = ${collectionId}`;
                let collectionNameQuery = db.query(
                  sqlCollectionName,
                  (err, nameResult: queryId) => {
                    if (err) {
                      console.error("Błąd w uzyskaniu słowek do kolekcji");
                    }
                    let wordsQuery = db.query(sqlWords, (err, wordResult) => {
                      if (err) {
                        console.error("Błąd w uzyskaniu słowek do kolekcji");
                      }
                      DBdata.collection.push({
                        name: nameResult[0].name as unknown as string,
                        words: wordResult as unknown as wordsArray,
                      });
                      if (endOfIteration == resultsLength) {
                        res.send(DBdata);
                      }
                      endOfIteration++;
                    });
                  }
                );
              }
            };
            pushCollections(resultsLength);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
};

export default getColecttions;
