import db from "../../database/dbconfig";
import { Request, Response } from "express";

const select = (req: Request, res: Response, next: Function) => {
  let sql = "SELECT * FROM User";

  let query = db.query(sql, (err, result) => {
    if (err) {
      // res.status(500);
      // res.send(err.message);
      console.log("error");
    }
    // res.status(200);
    // res.send(result);
    console.log(result);
  });

  next();
};

export default select;
