const express = require("express");
const router = express.Router();

const { getPrice } = require("../controller/pricecontroller");

router.post("/calculate", getPrice);

module.exports = router;