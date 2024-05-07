import express from "express";
import searchContractors from "../controllers/searchController.js";

const searchRoutes = express.Router();

// Route for searching contractors
searchRoutes.route("/search").get(searchContractors);

export default searchRoutes;
