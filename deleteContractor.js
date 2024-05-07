import mongoose from "mongoose";
import { Contractor } from "./models/Contractor.js"; // Import your Contractor model
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_CONNECTION_STRING;
async function deleteAllContractors() {
  try {
    // Connect to MongoDB
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Exclude useFindAndModify
      // useFindAndModify: false
    });

    // Delete all documents from the Contractor collection
    const deletionResult = await Contractor.deleteMany({});

    // Output the number of documents deleted
    console.log(
      `Deleted ${deletionResult.deletedCount} documents from the Contractor collection.`
    );
  } catch (error) {
    console.error("Error deleting documents:", error.message);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
}

export default deleteAllContractors;

deleteAllContractors();
