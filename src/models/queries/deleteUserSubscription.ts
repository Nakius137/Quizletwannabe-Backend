import db from "../dbconfig";
import { queryId } from "../../interfaces/@types";
const deleteUserSubscription = (userEmail: string, quizName: string) => {
  let sqlGetCollectionsId = `SELECT _id FROM Collection WHERE name = ${db.escape(
    quizName
  )}`;

  let getCollectionsId = db.query(
    sqlGetCollectionsId,
    (err, collectionId: queryId) => {
      if (err) {
        console.error(err);
      } else {
        let sqlGetUserId = `SELECT _id FROM User WHERE email = ${db.escape(
          userEmail
        )}`;

        let getUserId = db.query(sqlGetUserId, (err, SubscriberId: queryId) => {
          if (err) {
            console.error(err);
          } else {
            let sqlgetCollectionsIdInSubs = `SELECT * FROM subscriptions WHERE _collectionId = ${db.escape(
              collectionId[`0`][`_id`]
            )} `;
            let getCollectionsIdInSubs = db.query(
              sqlgetCollectionsIdInSubs,
              (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  let sqlDeleteSubscription = `DELETE FROM subscriptions WHERE (_collectionId = ${db.escape(
                    collectionId[`0`][`_id`]
                  )} AND _subscriberId = ${db.escape(
                    SubscriberId[`0`][`_id`]
                  )})`;

                  let deleteSubscription = db.query(
                    sqlDeleteSubscription,
                    (err, result) => {
                      if (err) {
                        console.error(err);
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
};
export default deleteUserSubscription;
