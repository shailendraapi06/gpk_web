import jwt from "jsonwebtoken";

const generateToken = (res, userId, role = "admin") => {
  const secret = process.env.JWT_SECRET || "gpk-website-super-secret-jwt-key-change-in-production-2026";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  const token = jwt.sign({ id: userId, role }, secret, {
    expiresIn
  });

  // Set HTTP-Only Cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return token;
};

export default generateToken;
