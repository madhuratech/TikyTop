const axios = require("axios");
const InstagramUser = require("../model/instagram");
const { fetchInstagramUser } = require("../services/instagramservices");


// Get Instagram User

exports.getInstagramUser = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const data = await fetchInstagramUser(username);

    if (!data) {
      return res.status(404).json({
        message: "Instagram user not found",
      });
    }

    const user = await InstagramUser.findOneAndUpdate(
      { username: data.username },
      data,
      {
        returnDocument: "after",
        upsert: true
      }
    );

    res.json(user);

  } catch (error) {
    console.error("Controller Error:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};



// Image Proxy (Instagram & Facebook images)

exports.getInstagramImage = async (req, res) => {
  try {
    const imageUrl = req.query.url;

    if (!imageUrl) {
      return res.status(400).json({
        message: "Image URL required"
      });
    }

    // Determine appropriate referer (Facebook images need facebook referer)
    let referer = "https://www.instagram.com/";
    if (imageUrl.includes("fbcdn.net")) {
      referer = "https://www.facebook.com/";
    }

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Referer": referer,
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      }
    });

    res.set("Content-Type", response.headers["content-type"] || "image/jpeg");
    res.set("Cache-Control", "public, max-age=86400"); // Cache for 24h
    res.send(response.data);

  } catch (error) {
    console.error("Image Proxy Error:", error.message);

    res.status(500).json({
      message: "Image load failed"
    });
  }
};