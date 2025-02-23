const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   const token = req.header("x-auth-token");
   if (!token) return res.status(401).json({ message: "Access Denied" });

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      res.status(400).json({ message: "Invalid Token" });
   }
};

// Role-based Access Control Middleware
const authorizeRoles = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return res.status(403).json({ message: "Access Forbidden" });
      }
      next();
   };
};

module.exports = { authMiddleware, authorizeRoles };
