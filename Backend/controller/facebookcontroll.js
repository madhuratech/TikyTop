const { getFacebookAll } = require("../services/facebookservices");

exports.getFacebookData = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return res.status(400).json({ success: false, message: "Username required" });

    let cleanUsername = decodeURIComponent(username).trim().replace(/^@/, "");
    let link;

    if (cleanUsername.startsWith("http")) {
      link = cleanUsername;
    } else {
      // Remove spaces for profile search if it's not a URL
      cleanUsername = cleanUsername.replace(/\s+/g, "");
      link = `https://www.facebook.com/${cleanUsername}`;
    }

    const data = await getFacebookAll(link);

    const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    res.json({
      success: true,
      username: cleanUsername,
      name: data.user.name,
      avatar: data.user.avatar || fallbackAvatar,
      followers: data.user.followers,
      following: data.user.following,
      posts: data.posts,
      postsCount: data.user.postsCount || data.posts.length,
      stats: {
        postsCount: data.user.postsCount || data.posts.length,
        followersCount: data.user.followers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Facebook data",
      error: error.message,
    });
  }
};