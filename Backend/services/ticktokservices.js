const axios = require("axios");

const getTiktok = async (username) => {
  const options = {
    method: 'GET',
    url: 'https://tiktok-scraper7.p.rapidapi.com/user/info',
    params: { unique_id: username }, 
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data.data; 
    if (!data) return null;

    let posts = [];
    try {
      const postsRes = await axios.get('https://tiktok-scraper7.p.rapidapi.com/user/posts', {
        params: { unique_id: username, count: 15 },
        headers: options.headers
      });
      const videos = postsRes.data?.data?.videos || [];
      posts = videos.map(v => ({
        id: v.video_id,
        link: `https://www.tiktok.com/@${username}/video/${v.video_id}`,
        image: v.origin_cover || v.cover || "",
        caption: v.title || ""
      }));
    } catch (postsErr) {
      console.error("RapidAPI TikTok Posts Error:", postsErr.message);
    }

    return {
      name: data.user.nickname,
      username: data.user.uniqueId,
      avatar: data.user.avatarThumb,
      followers: data.stats.followerCount,
      following: data.stats.followingCount,
      likes: data.stats.heartCount,
      posts_count:
      data.stats?.videoCount ||
      data.stats?.video_count ||
      data.userStats?.videoCount ||
    0,   
       posts: posts 
    };
  } catch (err) {
    console.error("RapidAPI TikTok Error:", err.message);
    return null;
  }
};

module.exports = { getTiktok };
