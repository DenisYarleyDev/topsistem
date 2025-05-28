// dropUsersTable.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  let connection;
  try {
    // 1) Abre conexão única
    connection = await mysql.createConnection({
      host:     process.env.DB_HOST,
      port:     Number(process.env.DB_PORT),
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    // 2) Executa o DROP TABLE
    await connection.execute(`ALTER TABLE products ADD COLUMN is_uni BOOLEAN DEFAULT FALSE;`);
    console.log("✅ FEITO aad is_uni");
  } catch (err) {
    console.error("❌ ero ao add uni `:", err);
    process.exitCode = 1;
  } finally {
    // 3) Encerra a conexão
    if (connection) await connection.end();
  }
}

main();

