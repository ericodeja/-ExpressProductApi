import jwt from "jsonwebtoken";
import "dotenv/config";

function createToken(role) {
  const accessToken = jwt.sign(
    {
      roles: [role],
    },
    process.env.SECRET_KEY,
    { expiresIn: "15m" }
  );

  return accessToken;
}

export default createToken;
