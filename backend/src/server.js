import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js";

import auditLogs from "./routes/auditLogsRouter.js"
import userRoutes from "./routes/usersRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import verifyJWTRoutes from "./routes/verifyJWT.js";
import sellersRoutes from "./routes/sellersRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

// CONFIGURAÇÃO DO CORS
app.use(
  cors({
    origin: process.env.URL_FRONTEND_FOR_CORS,
    credentials: true,
  })
);

app.use("/", auditLogs );
app.use("/", userRoutes);
app.use("/", sellersRoutes);
app.use("/", loginRoutes);
app.use("/", productRoutes);
app.use("/", verifyJWTRoutes);
app.use('/public/imgs/products', express.static('public/imgs/products'));

const port = 8080;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`SERVER  http://localhost:${port}`);
});

//!!!!REFATORAR AO PADRÃO MVC
