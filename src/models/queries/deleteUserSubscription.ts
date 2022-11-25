import db from "../dbconfig";

const deleteUserSubscription = (userEmail: string, quizName: string) => {
  console.log(quizName);

  let sqlGetCollectionsId = `SELECT _id FROM Collection WHERE name = ${db.escape(
    quizName
  )}`;

  let getCollectionsId = db.query(sqlGetCollectionsId, (err, collectionId) => {
    if (err) {
      console.error(err);
    }
    let sqlGetUserId = `SELECT _id FROM User WHERE email = ${db.escape(
      userEmail
    )}`;

    let getUserId = db.query(sqlGetUserId, (err, SubscriberId) => {
      if (err) {
        console.error(err);
      } else {
        console.log(SubscriberId);
      }
      let sqlgetCollectionsIdInSubs = `SELECT * FROM subscriptions WHERE _collectionId = ${db.escape(
        //@ts-ignore
        collectionId[`0`][`_id`]
      )} `;
      let getCollectionsIdInSubs = db.query(
        sqlgetCollectionsIdInSubs,
        (err, result) => {
          if (err) {
            console.error(err);
          }
          console.log(collectionId);
          console.log(result);

          let sqlDeleteSubscription = `DELETE FROM subscriptions WHERE (_collectionId = ${db.escape(
            //@ts-ignore
            collectionId[`0`][`_id`] //@ts-ignore
          )} AND _subscriberId = ${db.escape(SubscriberId[`0`][`_id`])})`;

          let DeleteSubscription = db.query(
            sqlDeleteSubscription,
            (err, result) => {
              if (err) {
                console.error(err);
              }
            }
          );
        }
      );
    });
  });
};
export default deleteUserSubscription;
