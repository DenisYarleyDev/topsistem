import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import verifyJWTRoutes from "./routes/verifyJWT.js";

const app = express();
app.use(express.json());

// CONFIGURAÇÃO DO CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", userRoutes);
app.use("/", loginRoutes);
app.use("/", verifyJWTRoutes)

//GENERATE JSONWEBTOKEN
export function generateToken(userId, userName) {
  const token = jwt.sign({ 
    userId: userId,
    userName: userName
  }, "senhasecreta", {
    expiresIn: 900,
  });

  return token;
}

//VALIDATE JSONWEBTOKEN MIDDLEWARE
export function validateToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.send("No token provided");
  }

  jwt.verify(token, "senhasecreta", (err, decoded) => {
    if (err) {
      return res.send("Failed to authenticatino");
    }
    req.userId = decoded.userId;
    req.userName = decoded.userName;

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
