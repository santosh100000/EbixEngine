//Creating multiple user to assign them with different access level

import mongoose from "mongoose";
import { User } from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB database

const url = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to populate users with different roles
const populateUsers = async () => {
  try {
    // Array of users with different roles
    const users = [
      {
        name: "Santosh Kharel",
        username: "santosh",
        password: "password",
        role: "super admin",
      },
      //   {
      //     name: "Jane Smith",
      //     username: "jane",
      //     password: "password",
      //     role: "client",
      //   },
      //   {
      //     name: "Alice Johnson",
      //     username: "alice",
      //     password: "password",
      //     role: "staff",
      //   },
      //   {
      //     name: "Bob Brown",
      //     username: "bob",
      //     password: "password",
      //     role: "super admin",
      //   },
    ];

    // Insert users into the database
    await User.save(users);
    console.log("Users inserted successfully");
  } catch (error) {
    console.error("Error populating users:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Populate users
populateUsers();
