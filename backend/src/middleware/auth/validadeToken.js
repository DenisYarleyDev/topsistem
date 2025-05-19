import jwt from "jsonwebtoken";

//VALIDATE JSONWEBTOKEN MIDDLEWARE
export function ValidateToken(req, res, next) {
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
    req.Admim = decoded.Admim;
    req.cargo = decoded.cargo;

    next();
  });
}