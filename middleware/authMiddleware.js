// Middleware for authentication based on a role
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming user information is attached to the request object
    if (allowedRoles.includes(userRole)) {
      next(); // User has the required role, proceed to the next middleware/route handler
    } else {
      res.status(403).json({
        message: "Sorry, you are no authorized to perform this action",
      }); // User does not have the required role
    }
  };
};
export default checkRole;
