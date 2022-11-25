import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWD,
  port: 3306,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Połączono");
  }
});

export default db;
