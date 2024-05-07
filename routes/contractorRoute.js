import express from "express";
import addContractor from "../controllers/contractorController.js";
import updateContractor from "../controllers/updateController.js";

const contractorRoute = express.Router();

contractorRoute.route("/add").post(addContractor);
contractorRoute.route("/:ConID").patch(updateContractor);

export default contractorRoute;
