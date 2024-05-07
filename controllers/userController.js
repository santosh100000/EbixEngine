// // Import necessary modules
// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { User } from "../models/User.js";
// // Create an Express router
// const userRoutes = express.Router();

// // Authentication endpoint
// userRoutes.post("/user/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if username exists in the database
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Verify password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, username: user.username, role: user.role },
//       "your_secret_key",
//       { expiresIn: "1h" }
//     );

//     // Send token in response
//     res.json({ token });
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Controller for handling dashboard requests
// const dashboardController = (req, res) => {
//   const userRole = req.user.role;
//   let dashboardMessage = "";

//   // Determine dashboard message based on user role
//   switch (userRole) {
//     case "super admin":
//       dashboardMessage = "Welcome to the super admin dashboard";
//       break;
//     case "staff":
//       dashboardMessage = "Welcome to the staff dashboard";
//       break;
//     case "contractor":
//       dashboardMessage = "Welcome to the contractor dashboard";
//       break;
//     case "client":
//       dashboardMessage = "Welcome to the client dashboard";
//       break;
//     default:
//       dashboardMessage = "Welcome to the dashboard";
//   }

//   res.json({ message: dashboardMessage });
// };

// // Route accessible to all authenticated users
// userRoutes.get(
//   "/dashboard",
//   (req, res, next) => {
//     // Pass the user's role to the checkRole middleware dynamically
//     checkRole(req.user.role)(req, res, next);
//   },
//   dashboardController
// );

// export default userRoutes;
// Import necessary modules
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

// Create an Express router
const userRoutes = express.Router();

// Controller for handling user authentication and dashboard requests
const userController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    console.log("Got here");
    console.log(req.body);
    console.log(`user: ${username}, password:${password}`);

    try {
      // Check if username exists in the database
      const user = await User.findOne({ username });
      console.log(`user from database: ${user}`);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        "your_secret_key",
        { expiresIn: "1h" }
      );

      // Send token in response
      res.json({ token });
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  dashboard: (req, res) => {
    const userRole = req.user.role;
    let dashboardMessage = "";

    // Determine dashboard message based on user role
    switch (userRole) {
      case "super admin":
        dashboardMessage = "Welcome to the super admin dashboard";
        break;
      case "staff":
        dashboardMessage = "Welcome to the staff dashboard";
        break;
      case "contractor":
        dashboardMessage = "Welcome to the contractor dashboard";
        break;
      case "client":
        dashboardMessage = "Welcome to the client dashboard";
        break;
      default:
        dashboardMessage = "Welcome to the dashboard";
    }

    res.json({ message: dashboardMessage });
  },
};

// Route for user login
userRoutes.post("/user/login", userController.login);

// Route for dashboard requests
userRoutes.get(
  "/dashboard",
  (req, res, next) => {
    // Pass the user's role to the checkRole middleware dynamically
    checkRole(req.user.role)(req, res, next);
  },
  userController.dashboard
);

export default userRoutes;
