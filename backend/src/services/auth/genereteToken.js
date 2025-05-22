import jwt from "jsonwebtoken";

//GENERATE JSONWEBTOKEN
export function generateToken(userId, userName, Admin, cargo) {
  console.log(Admin, cargo)
  const token = jwt.sign(
    {
      userId: userId,
      userName: userName,
      admin: Admin,
      cargo: cargo
    },
    "senhasecreta",
    {
      expiresIn: 250000,
    }
  );


  return token;
}
