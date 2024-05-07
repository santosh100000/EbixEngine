// controllers/contractorController.js

import { Contractor } from "../models/Contractor.js";

const searchContractor = async (req, res) => {
  try {
    // Retrieve search query parameters from request
    const {
      ConID,
      client,
      tradingName,
      entityName,
      abn,
      trade,
      streetAddress,
      suburb,
      state,
      postcode,
      ohAndSRequested,
      contactName,
      contactPhone,
      contactMobile,
      contactFax,
      contactEmail,
      status,
    } = req.query;

    // Construct MongoDB query based on search parameters
    const query = {
      ...(ConID && { ConID }),
      ...(client && { client }),
      ...(tradingName && { tradingName }),
      ...(entityName && { entityName }),
      ...(abn && { abn }),
      ...(trade && { trade }),
      ...(streetAddress && { streetAddress }),
      ...(suburb && { suburb }),
      ...(state && { state }),
      ...(postcode && { postcode }),
      ...(ohAndSRequested && { ohAndSRequested }),
      ...(contactName && { "contact.name": contactName }),
      ...(contactPhone && { "contact.phone": contactPhone }),
      ...(contactMobile && { "contact.mobile": contactMobile }),
      ...(contactFax && { "contact.fax": contactFax }),
      ...(contactEmail && { "contact.email": contactEmail }),
      ...(status && { status }),
      // Add more conditions as needed
    };

    // Execute the search query
    const searchResults = await Contractor.find(query);

    // Return search results as JSON response
    res.status(200).json({ searchResults });
  } catch (error) {
    console.error("Failed to search contractors:", error);
    res
      .status(500)
      .json({ error: "Failed to search contractors", message: error.message });
  }
};

export default searchContractor;
