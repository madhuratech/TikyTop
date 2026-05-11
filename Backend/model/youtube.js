const mongoose = require("mongoose");

const youtubeChannelSchema = new mongoose.Schema({

  channelName: String,
  channelId: String,
  username: String,
  description: String,
  subscribers: Number,
  totalViews: Number,
  videosCount: Number,
  avatar: String,
  verified: Boolean,

  videos: [
    {
      videoId: String,
      title: String,
      link: String,
      thumbnail: String,
      views: Number,
      likes: Number,
      comments: Number
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("YoutubeChannel", youtubeChannelSchema);