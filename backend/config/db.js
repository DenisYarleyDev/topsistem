import mysql from "mysql2/promise";
import dotenv from "dotenv";

//!!!!REFATORAR AO PADRÃO MVC

dotenv.config();

//DATABASE CONNECTION

//QUANDO POR EM PRODUÇÃO USAR ENV
const db = await mysql.createConnection({
  database: "railway",
  user: "root",
  password: "ffKZWQVdbZxtwKzSKKIYDEMPfbHcpEmr",
  host: "shortline.proxy.rlwy.net",
  port: 33837,
});

console.log("Conectado ao banco");

export default db;
