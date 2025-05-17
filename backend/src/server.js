import express from "express";

import cors from "cors";
import userRoutes from "./routes/usersRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import verifyJWTRoutes from "./routes/verifyJWT.js";
import dotenv  from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// CONFIGURAÇÃO DO CORS
app.use(
  cors({
    origin: process.env.URL_FRONTEND_FOR_CORS ,
    credentials: true,
  })
);

app.use("/", userRoutes);
app.use("/", loginRoutes);
app.use("/", verifyJWTRoutes)



const port = 8080;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`SERVER http://localhost:${port}`);
});

//!!!!REFATORAR AO PADRÃO MVC
