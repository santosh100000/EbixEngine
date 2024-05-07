import express from "express";
import getStrataplusContractors from "../controllers/strataPlusController.js";

const strataPlusEPRoute = express.Router();

strataPlusEPRoute.route("/strataplus").get(getStrataplusContractors);

export default strataPlusEPRoute;
