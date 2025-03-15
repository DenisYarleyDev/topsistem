import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//DATABASE CONNECTION
const db = mysql.createConnection({
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
});

//START CONNECTION
db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("DATABASE CONNECTION SUCCESSFUL");
});

export default db;
