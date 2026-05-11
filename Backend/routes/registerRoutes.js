const express = require("express");
const router = express.Router();
const {postRegister} = require("../controller/registercontrol");

router.post("/register", postRegister);

module.exports = router;
