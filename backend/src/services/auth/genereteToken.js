import jwt from "jsonwebtoken";

//GENERATE JSONWEBTOKEN
export function generateToken(userId, userName, cargo) {
  const token = jwt.sign({ 
    userId: userId,
    userName: userName,
    cargo: cargo
  }, "senhasecreta", {
    expiresIn: 900,
  });

  return token;
}