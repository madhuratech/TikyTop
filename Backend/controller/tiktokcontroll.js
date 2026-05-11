const axios = require("axios");
const { getTiktok } = require("../services/ticktokservices");
const TiktokUser = require("../model/tiktok");

//get tiktok user

exports.getTiktokUser = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const data = await getTiktok(username);

    if (!data) {
      return res.status(404).json({
        message: "Tiktok user not found",
      });
    }

    const user = await TiktokUser.findOneAndUpdate(
  { username: data.username },
   data,
  {
    returnDocument: "after",
    upsert: true,
  }
);

    res.json(user);
  } catch (error) {
    console.error("Controller Error:", error.message);

    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

//Get Tiktok Posts

exports.gettiktokposts = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    
    const data = await getTiktok(username);

    if (!data || !data.posts) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    res.json(data.posts);

  } catch (error) {
    console.error("Posts Controller Error:", error.message);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};