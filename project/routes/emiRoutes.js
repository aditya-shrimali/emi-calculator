const express = require("express");
const { calculateEMI } = require("../controllers/emiController");
const router = express.Router();
const { getAllEMIs, getEMIById } = require("../controllers/emiController");

router.post("/calculate-emi", calculateEMI);

router.get("/emis", getAllEMIs);
router.get("/emi/:id", getEMIById);

module.exports = router;
