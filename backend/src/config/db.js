// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// 1) Cria a pool de conexões
const db = mysql.createPool({
  host               : process.env.DB_HOST,
  port               : Number(process.env.DB_PORT),
  user               : process.env.DB_USER,
  password           : process.env.DB_PASS,
  database           : process.env.DB_NAME,
  waitForConnections : true,
  connectionLimit    : 10,
  queueLimit         : 0,
});

console.log("✅ Pool de conexões MySQL criado");

// 2) Função de inicialização: cria tabelas e insere cargos padrão
async function initDb() {
  // Cria tabela roles
  await db.execute(`
    CREATE TABLE IF NOT EXISTS roles (
      id   INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE
    ) ENGINE=InnoDB;
  `);

  // Cria tabela users
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id       INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50)  NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      cargo    INT           NOT NULL,
      telefone VARCHAR(20)   NOT NULL,
      FOREIGN KEY (cargo)
        REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
    ) ENGINE=InnoDB;
  `);

  // Insere cargos padrão
  const roles = ["SUPERUSER", "ADMIN", "VENDEDOR"];
  for (const role of roles) {
    await db.execute(
      `INSERT IGNORE INTO roles (name) VALUES (?);`,
      [role]
    );
  }

  console.log("✅ Tabelas (roles, users) inicializadas com cargos padrão");
}

// 3) Executa a inicialização uma única vez
initDb()
  .catch(err => {
    console.error("❌ Falha ao inicializar o banco:", err);
    process.exit(1);
  });

// 4) Exporta a pool para consumo em toda a aplicação
export default db;
