const axios = require("axios");

const parseYouTubeCount = (count) => {
  if (!count) return "0";
  if (typeof count === "number") return count.toLocaleString();
  // If already matches M/K pattern, just return it or cleanup
  return count.toString()
    .replace(/\s+/g, "")
    .replace(/subscribers/i, "")
    .trim();
};

const getChannelIdFromUsername = async (username) => {
  try {
    const response = await axios.get("https://yt-api.p.rapidapi.com/search", {
      params: { query: username, type: "channel" },
      headers: {
        "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
        "x-rapidapi-host": "yt-api.p.rapidapi.com"
      }
    });

    const channels = response.data?.data || [];
    return channels.length > 0 ? channels[0].channelId : null;
  } catch (error) {
    console.error("Search Error:", error.message);
    return null;
  }
};
const fetchyoutubechanel = async (channelId) => {
  try {

    // 🔥 CHANNEL DETAILS
    const aboutRes = await axios.get(
      "https://yt-api.p.rapidapi.com/channel/about",
      {
        params: { id: channelId },
        headers: {
          "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
          "x-rapidapi-host": "yt-api.p.rapidapi.com"
        }
      }
    );

    const about = aboutRes.data;

    // 🔥 VIDEOS
    const videosRes = await axios.get(
      "https://yt-api.p.rapidapi.com/channel/videos",
      {
        params: {
          id: channelId,
          sort_by: "newest"
        },
        headers: {
          "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
          "x-rapidapi-host": "yt-api.p.rapidapi.com"
        }
      }
    );

    const videosData = videosRes.data?.data || [];

    const videos = videosData.map((v) => ({
      id: v.video_id || v.videoId || (v.id && typeof v.id === 'string' ? v.id : null),
      image: v.thumbnail?.[0]?.url || v.thumbnail?.[v.thumbnail?.length - 1]?.url,
      views: v.view_count || v.views,
      type: "video"
    }));


    // 🔥 SHORTS
    const shortsRes = await axios.get(
      "https://yt-api.p.rapidapi.com/channel/shorts",
      {
        params: {
          id: channelId,
          sort_by: "newest"
        },
        headers: {
          "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
          "x-rapidapi-host": "yt-api.p.rapidapi.com"
        }
      }
    );

    const shortsData = shortsRes.data?.data || [];

    const shorts = shortsData.map((s) => ({
      id: s.video_id || s.videoId || (s.id && typeof s.id === 'string' ? s.id : null),
      image: s.thumbnail?.[0]?.url || s.thumbnail?.[s.thumbnail?.length - 1]?.url,
      views: s.view_count || s.views,
      type: "short"
    }));


    // 🔥 MERGE BOTH
    const allPosts = [...videos, ...shorts];

    return {
      channelName: about.title,
      channelId: channelId,
      username: about.channelHandle || about.title,
      avatar: about.avatar?.[about.avatar.length - 1]?.url || about.avatar?.[0]?.url,

      subscribers: parseYouTubeCount(about.subscriberCount),
      following: 0,
      videosCount: parseYouTubeCount(about.videosCount),

      verified: about.is_verified || false,
      videos: allPosts,
      posts: allPosts
    };

  } catch (error) {
    console.log("YOUTUBE API ERROR:", error.response?.data || error.message);
    return null;
  }
};

module.exports = { fetchyoutubechanel, getChannelIdFromUsername };