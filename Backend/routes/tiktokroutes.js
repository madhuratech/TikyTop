const express = require("express")
const { getTiktokUser, gettiktokposts } = require("../controller/tiktokcontroll");
const router = express.Router();

router.get("/user/:username", getTiktokUser);
router.get("/video/:username", gettiktokposts);

module.exports = router;