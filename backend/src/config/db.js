// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// 1) Cria a pool de conexões
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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

  /*  await db.execute(`
     DROP TABLE IF EXISTS products;
    
   `)
 
   await db.execute(`
 
     DROP TABLE IF EXISTS categories;
   `) */
  await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE
    );
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      image_url VARCHAR(255),
      stock INT DEFAULT 0,
      category_id INT REFERENCES categories(id),   -- Relação categoria
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );  
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      table_name VARCHAR(50) NOT NULL,     -- Qual tabela foi alterada
      record_id INT NOT NULL,              -- ID do registro alterado
      action VARCHAR(20) NOT NULL,         -- Tipo da ação (CREATE, UPDATE, DELETE)
      old_data JSON,                      -- Dados antes da alteração (se for update/delete)
      new_data JSON,                      -- Dados depois da alteração (se for create/update)
      changed_by INT,                      -- ID do usuário que fez a ação
      changed_at TIMESTAMP DEFAULT NOW()   -- Data/hora da alteração
    );
  
  `)
  await db.execute(`
  CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    role_id INT NOT NULL DEFAULT 16,
    seller_id INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES users(id)
  );
`);



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
