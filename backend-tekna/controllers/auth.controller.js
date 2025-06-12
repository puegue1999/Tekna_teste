import jwt from "jsonwebtoken";

// Middleware to authenticate JWT tokens
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_ENCRYPTION, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token is expired or invalid" });
    }

    req.user = user;
    next();
  });
};
