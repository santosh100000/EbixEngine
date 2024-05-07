import { Contractor } from "../models/Contractor.js";

const getStrataplusContractors = async (req, res) => {
  try {
    // Query the database to find all contractors with client 'Strataplus'
    const contractors = await Contractor.find({
      clients: { $in: ["Strata Plus"] },
    }).select("-clients");

    // console.log("got called for strata plus api");
    // console.log(contractors);

    // Return the list of contractors as JSON response
    res.status(200).json(contractors);
  } catch (error) {
    // If there's an error, return an error response
    console.error("Error retrieving Strataplus contractors:", error);
    res.status(500).json({
      error: "Failed to retrieve Strataplus contractors",
      message: error.message,
    });
  }
};

// Export the controller function
export default getStrataplusContractors;
