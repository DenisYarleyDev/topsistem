import express from "express";
import cors from "cors";
import db from "./dbConnection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,x-access-token",
  })
);
app.use(express.json());

//CONTINUAR A CONFIGURAR O JWT - ULTIMO TOKEN JA EXPIROU
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ err });
    }
    req.userId = decoded.userId;
    next();
  });
}

//INITIAL ROUTE
app.get("/", verifyJWT, (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(404).json({ res: "Sem conexão com o banco" });
    }

    return res.status(200).json({ res: "Conectado ao banco" });
  });
});

//ROUTE LIST USERS
app.get("/users", verifyJWT, (req, res) => {
  console.log(req.userId + " tudo certo!");

  //GET USERS FROM DATABASE
  const SQL = `SELECT * FROM users`;

  db.query(SQL, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    }
    return res.status(401).json({ err });
  });
});

//ROUTE LOGIN
app.post("/login", (req, res) => {
  const { user, password } = req.body;

  //CHECK IF USER EXISTS IN THE DATABASE
  const SQL = `SELECT * FROM users WHERE user = ?`;

  //DATA VALIDATE LOGIN
  if (user && password) {
    db.query(SQL, user, (err, result) => {
      try {
        if (!err) {
          //CHECK IF USER AND PASSWORD EXISTS IN THE DATABASE
          if (user === result[0].user && password === result[0].password) {
            //CREATE JWT AND EXPIRES IN
            const token = jwt.sign(
              { userId: result[0].id },
              process.env.SECRET,
              {
                expiresIn: 900,
              }
            );

            return res.status(200).json({
              msg: "LOGIN SUCCESSFUL",
              user: result[0].user,
              id: result[0].id,
              admin: result[0].admin == "1" ? true : false,
              token,
            });
          }
          return res.status(401).json({ msg: "USER NOT FOUND" });
        }
      } catch {
        return res.status(401).json({ msg: "USER NOT FOUND" });
      }
    });
  } else {
    console.log("USER OR PASSWORD EMPTY");
  }
});

//ROUTE CAD USER
app.post("/cad-user/:id", (req, res) => {
  const { user, password, admin } = req.body;
  //ID FROM ADMIN ACCOUNT
  const { id } = req.params;

  const SQL = "SELECT * FROM users WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }

    if (result.length === 0) {
      return res.status(404).json({ err: "ADMIN NÃO ENCONTRADO" });
    }

    //IF USER EXIST AND IS ADMIN
    if (result[0].id == id && result[0].admin == "1") {
      //INSERT NEW USER IN THE DATABASE
      const SQL2 = "INSERT INTO users (user, password, admin) VALUES (?,?,?)";

      //DATA VALIDATE CAD
      if (user && password && admin) {
        //CAD NEW USER
        db.query(SQL2, [user, password, admin], (err) => {
          if (err) {
            return res.status(401).json({ err });
          }

          return res.status(200).json({ msg: "NEW USER CAD!" });
        });
      }
    } else {
      res.status(404).json({ error: "USER DOES NOT EXIST OR IS NOT ADMIN" });
    }
  });
});

//ROUTE DELETE USER
app.delete("/del-user/:id/:user", (req, res) => {
  const { id, user } = req.params;

  //SEARCH FOR USER REQUESTING DELETION
  const SQL = "SELECT * FROM users WHERE id = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }
    if (result.length === 0) {
      return res.status(404).json({ err: "USER NOT FOUND" });
    }

    //IF USER EXIST AND IS ADMIN
    if (result[0].id == id && result[0].admin == "1") {
      //SEARCH FOR USER TO BE DELETED
      const SQL2 = "SELECT * FROM users WHERE user = ?";
      db.query(SQL2, [user], (err, result2) => {
        if (err) {
          return res.status(401).json({ err });
        }

        //DELETE USER
        const SQL3 = "DELETE FROM users WHERE id = ?";

        if (result2.length === 0) {
          return res.status(404).json({ err: "USER TO DELETE NOT FOUND" });
        }

        //DATA VALIDATE DELETE
        if (id && user) {
          //DEL USER
          db.query(SQL3, result2[0].id, (err) => {
            if (err) {
              return res.status(401).json({ err });
            }

            return res.status(200).json({
              msg: `USER ${result[0].user} ID ${result2[0].id} DELETED!`,
            });
          });
        }
      });
    } else {
      res.status(404).json({ error: "USER DOES NOT EXIST OR IS NOT ADMIN" });
    }
  });
});

export default app;
