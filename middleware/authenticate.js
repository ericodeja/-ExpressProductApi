import "dotenv/config";
import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("Authorization header not provided");
      return next(error);
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      const error = new Error("Token not provided");
      return next(error);
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !Array.isArray(req.user.roles)) {
        const error = new Error("Unauthorized");
        error.status = 401;
        next(error);
      }

      const hasRole = req.user.roles.some((role) => {
        return allowedRoles.includes(role);
      });

      if (!hasRole) {
        const error = new Error("Forbidden: Insufficient Roles");
        error.status = 401;
        return next(error);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export { authenticate, authorizeRoles };
