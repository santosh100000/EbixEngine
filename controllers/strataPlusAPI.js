// controllers/EbixSyncController.js

import axios from "axios";
import { Contractor } from "../models/Contractor.js";

export const syncContractorsWithStrataPlus = async (req, res) => {
  try {
    const { url } = req.body;
    console.log(`url: ${url}`);

    const strataplusResponse = await axios.get(url);
    const strataplusContractors = strataplusResponse.data;

    const existingContractor = await Contractor.findOne().sort("-ConID");
    const latestConID = existingContractor ? existingContractor.ConID : 0;

    const ebixContractors = await Contractor.find();

    const newContractors = strataplusContractors.filter(
      (strataplusContractor) => {
        return !ebixContractors.some(
          (ebixContractor) =>
            ebixContractor.ConID === strataplusContractor.ConID
        );
      }
    );

    for (const newContractorData of newContractors) {
      // Add ConID and clients to the new contractor data
      const newContractor = new Contractor({
        ...newContractorData,
        ConID: latestConID + 1,
        clients: ["Strata Plus"], // Adding Strataplus as client
      });
      await newContractor.save();
    }

    return res.status(200).json({
      success: true,
      message: `${newContractors.length} new contractors added to Ebix successfully`,
      newContractors: newContractors,
    });
  } catch (error) {
    console.error("Error syncing contractors with Ebix:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
