const axios = require("axios");

const fetchInstagramUser = async (username) => {
  try {

    // Profile request
    const response = await axios.post(
      "https://instagram120.p.rapidapi.com/api/instagram/profile",
      { username },
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "instagram120.p.rapidapi.com",
          "Content-Type": "application/json"
        }
      }
    );

    const user = response.data.result;

    // Posts request
    const postsres = await axios.post(
  "https://instagram120.p.rapidapi.com/api/instagram/posts",
  {
    username: username,
    maxId: ""
  },
  {
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "instagram120.p.rapidapi.com",
      "Content-Type": "application/json"
    }
  }
);
        const rawData = postsres.data.result;
        const postsArray = Array.isArray(rawData) ? rawData : (rawData?.edges || rawData?.items || []);

        return {
            name: user.full_name,
            username: user.username,
            instagramId: user.id,
            followers: user.edge_followed_by?.count || 0,
            following: user.edge_follow?.count || 0,
            posts_count: user.edge_owner_to_timeline_media?.count || 0,
            bio: user.biography,
            avatar: user.profile_pic_url_hd,
            verified: false,
            posts: postsArray.map((p) => {
    const item = p.node || p;

    const idToShortcode = (id) => {
        if (!id) return null;
        try {
            const longId = id.toString().split('_')[0];
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
            let n = BigInt(longId);
            let res = '';
            while (n > 0n) {
                res = alphabet[Number(n % 64n)] + res;
                n = n / 64n;
            }
            return res;
        } catch (e) {
            return null;
        }
    };

    const idValue = item.id || item.pk || item.instagramId;
    const shortcode = item.shortcode || item.code || item.short_code || idToShortcode(idValue);
    const postLink = item.permalink || item.link || (shortcode ? `https://www.instagram.com/p/${shortcode}/` : null);

    return {
        id: idValue,
        shortcode: shortcode,
        link: postLink,
        image: item.display_url || item.image_versions2?.candidates?.[0]?.url || item.thumbnail_url || "",
        caption: item.caption?.text || item.caption || item.text || ""
    };
            })
        };

    } catch (error) {
        console.log("Instagram API ERROR:", error.response?.data || error.message);
        return null;
    }
};

module.exports = { fetchInstagramUser };
