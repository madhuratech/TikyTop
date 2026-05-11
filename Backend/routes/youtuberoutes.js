const express = require("express");
const router = express.Router();

const { getYoutubeUser, getyoutubevideos } = require("../controller/youtubecontroll");

router.get("/search/:username", getYoutubeUser);
router.get("/videos/:channelId", getyoutubevideos);

module.exports = router;