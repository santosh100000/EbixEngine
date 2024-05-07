// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const ContractorSchema = new Schema({
//   ConID: { type: Number, unique: true, required: true }, // Unique identifier for the contractor
//   clients: [
//     {
//       type: String,
//       enum: ["Alpha Strata", "Strata Plus", "MICM", "Tideways"], // List of allowed client names
//       required: true,
//     },
//   ],
//   tradingName: { type: String, required: true },
//   entityName: { type: String, required: true },
//   abn: { type: String, required: false },
//   trade: { type: String, required: true },
//   streetAddress: { type: String, required: true },
//   suburb: { type: String, required: true },
//   state: {
//     type: String,
//     enum: ["NSW", "VIC", "WA", "SA", "QLD", "ACT", "NT", "TAS"],
//     default: "NSW",
//   },
//   postcode: { type: String, required: true },
//   ohAndSRequested: { type: Boolean, default: false },
//   contact: {
//     name: { type: String },
//     phone: { type: String, required: true },
//     mobile: { type: String },
//     fax: { type: String },
//     email: { type: String, required: true },
//   },

//   // name: { type: String },
//   // phone: { type: String, required: true },
//   // mobile: { type: String },
//   // fax: { type: String },
//   // email: { type: String, required: true },

//   status: {
//     type: String,
//     enum: ["Pending", "Approved", "Not Approved", "Restricted"],
//     default: "Pending",
//   },
// });

// // Middleware to generate unique ConID before saving
// ContractorSchema.pre("save", async function (next) {
//   try {
//     console.log("got there");
//     if (!this.ConID) {
//       const existingContractor = await this.model("Contractor")
//         .findOne()
//         .sort("-ConID");
//       const latestConID = existingContractor ? existingContractor.ConID : 0;
//       this.ConID = latestConID + 1;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// const Contractor = mongoose.model("Contractor", ContractorSchema);
// export { Contractor };
import mongoose from "mongoose";

const { Schema } = mongoose;

const InsuranceSchema = new Schema({
  description: { type: String, required: true },
  insurer: { type: String, required: true },
  holder: { type: String, required: true },
  number: { type: String, required: true },
  expiry: { type: Date, required: true },
  comments: { type: String },
});

const ContractorSchema = new Schema({
  ConID: { type: Number, unique: true, required: true },
  clients: [
    {
      type: String,
      enum: ["Alpha Strata", "Strata Plus", "MICM", "Tideways"],
      required: true,
    },
  ],
  tradingName: { type: String, required: true },
  entityName: { type: String, required: true },
  abn: { type: String },
  trade: {
    type: String,
    enum: [
      "Plumbing",
      "Carpenter",
      "Cleaners",
      "Electrician",
      "Builder",
      "Landscaper",
      "Tiler",
    ],
    default: "Plumbing",
  },
  streetAddress: { type: String, required: true },
  suburb: { type: String, required: true },
  state: {
    type: String,
    enum: ["NSW", "VIC", "WA", "SA", "QLD", "ACT", "NT", "TAS"],
    default: "NSW",
  },
  postcode: { type: String, required: true },
  ohAndSRequested: { type: Boolean, default: false },
  contact: {
    name: { type: String },
    phone: { type: String, required: true },
    mobile: { type: String },
    fax: { type: String },
    email: { type: String, required: true },
  },
  insuranceDetails: [InsuranceSchema], // Embed insurance details as a subdocument array
  status: {
    type: String,
    enum: [
      "Approved",
      "Not Approved",
      "Restricted",
      "Exempt",
      "Alert",
      "Strata New",
      "Pending",
    ],
    default: "Pending",
  },
});

// Middleware to generate unique ConID before saving
ContractorSchema.pre("save", async function (next) {
  try {
    if (!this.ConID) {
      const existingContractor = await this.model("Contractor")
        .findOne()
        .sort("-ConID");
      const latestConID = existingContractor ? existingContractor.ConID : 0;
      this.ConID = latestConID + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Contractor = mongoose.model("Contractor", ContractorSchema);
export { Contractor };
