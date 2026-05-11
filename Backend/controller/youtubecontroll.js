const axios = require("axios");
const { fetchyoutubechanel, getChannelIdFromUsername } = require("../services/youtubeservices");
const YoutubeUser = require("../model/youtube");


// GET YOUTUBE CHANNEL
exports.getYoutubeUser = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    // 🔥 convert username → channelId
    let channelId = username;

    if (!username.startsWith("UC")) {
      channelId = await getChannelIdFromUsername(username);
    }

    if (!channelId) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const data = await fetchyoutubechanel(channelId);

    if (!data) {
      return res.status(404).json({ message: "Youtube channel not found" });
    }

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET YOUTUBE VIDEOS
exports.getyoutubevideos = async (req, res) => {
  try {

    const { channelId } = req.params;

    if (!channelId) {
      return res.status(400).json({
        message: "Channel ID is required"
      });
    }

    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          channelId: channelId,
          part: "snippet",
          order: "date",
          maxResults: 10,
          type: "video"
        }
      }
    );

    const videoIds = searchResponse.data.items.map(
      (item) => item.id.videoId
    );

    const videos = await Promise.all(
      videoIds.map(async (id) => {

        const videoResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              key: process.env.YOUTUBE_API_KEY,
              id: id,
              part: "snippet,statistics"
            }
          }
        );

        return videoResponse.data.items[0];

      })
    );

    res.json(videos);

  } catch (error) {

    console.error("Controller Error:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};