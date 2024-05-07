import { Contractor } from "../models/Contractor.js";

// Enum array for allowed client names
const allowedClients = ["Alpha Strata", "Strata Plus", "MICM", "Tideways"];

const addContractor = async (req, res) => {
  try {
    console.log("Got inside the controller");

    // Get the client string from the request body
    const clientString = req.body.client;

    // Check if the client string is one of the allowed values
    if (!allowedClients.includes(clientString)) {
      return res.status(400).json({ error: "Invalid client value" });
    }

    // Map the client string to an array
    const clientsArray = [clientString];

    // Remove the client property from the request body
    const { client, ...contractorData } = req.body;

    // Generate ConID
    const existingContractor = await Contractor.findOne().sort("-ConID");
    const latestConID = existingContractor ? existingContractor.ConID : 0;

    // Create a new Contractor instance with the mapped clients array
    const contractor = new Contractor({
      ...contractorData,
      clients: clientsArray,
      ConID: latestConID + 1,
    });

    // Save the contractor to the database
    await contractor.save();

    console.log("Contractor saved successfully");
    res
      .status(200)
      .json({ message: "Contractor added successfully", contractor });
  } catch (error) {
    console.error("Error adding contractor:", error);
    res
      .status(500)
      .json({ error: "Failed to add contractor", message: error.message });
  }
};

export default addContractor;
