const express = require("express");
const router = express.Router();

const {getFacebookData } = require("../controller/facebookcontroll");

router.get("/user/all/:username", getFacebookData );

module.exports = router;