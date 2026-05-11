const express = require("express");
const router = express.Router();
const { getInstagramUser , getInstagramImage } = require("../controller/instagramcontroll");

router.get("/user/:username", getInstagramUser);
router.get("/image", getInstagramImage);

module.exports = router;