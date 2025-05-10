import express from "express";
import jwt from "jsonwebtoken";

import userRoutes from "./routes/usersRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

const app = express();
app.use(express.json());

app.use("/", userRoutes);
app.use("/", loginRoutes);

//GENERATE JSONWEBTOKEN
export function generateToken(identifier) {
  const token = jwt.sign({ user: identifier }, "senhasecreta", {
    expiresIn: 900,
  });

  return token;
}

//VALIDATE JSONWEBTOKEN MIDDLEWARE
export function validateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.send("No token provided");
  }

  jwt.verify(token, "senhasecreta", (err, decoded) => {
    if (err) {
      return res.send("Failed to authenticatino");
    }

    req.userId = decoded;
    next();
  });
}

const port = 8080;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`SERVER http://localhost:${port}`);
});

//!!!!REFATORAR AO PADRÃO MVC
