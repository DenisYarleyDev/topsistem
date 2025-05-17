import jwt from "jsonwebtoken";

//GENERATE JSONWEBTOKEN
export function generateToken(userId, userName, Admin) {
  const token = jwt.sign({ 
    userId: userId,
    userName: userName,
    admin : Admin
  }, "senhasecreta", {
    expiresIn: 900,
  });

  return token;
}