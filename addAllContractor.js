//function to ADD multiple demo contractor for testing from json

import mongoose from "mongoose";
import contractors from "./contractors.js";
import { Contractor } from "./models/Contractor.js"; // Import your Contractor model
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_CONNECTION_STRING;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const addContractors = async (contractors) => {
  let currentConID = 123456;
  try {
    // Iterate over each contractor object
    for (const contractorData of contractors) {
      contractorData.ConID = currentConID++;
      // Create a new Contractor document
      const contractor = new Contractor(contractorData);
      // Save the document to the database
      await contractor.save();
      console.log(`Contractor added: ${contractor._id}`);
    }
    console.log("All contractors added successfully.");
  } catch (error) {
    console.error("Error adding contractors:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

addContractors(contractors);
