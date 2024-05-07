//Route to sync the ebix data with Strata Plus db, for now the logic is we are only for the new contractor added by strata plus in their db , believing the contractor details are more up to date in Trades MOnitor
//Whilst incase of Strata Plus APi, they pick on new contractor and updates made on contractor Ebix db and add those new contractor and update the details of contractor while calling data exchange API
import express from "express";
import { syncContractorsWithStrataPlus } from "../controllers/strataPlusAPI.js";

const strataPlusAPIRoutes = express.Router();

strataPlusAPIRoutes
  .route("/syncContractorsWithStrataPlus")
  .post(syncContractorsWithStrataPlus);

export default strataPlusAPIRoutes;
