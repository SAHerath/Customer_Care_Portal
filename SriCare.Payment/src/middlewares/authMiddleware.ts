import { expressjwt, GetVerificationKey } from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SIGNING_KEY as string,
  algorithms: ["HS256"],
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
});

export default jwtMiddleware;
