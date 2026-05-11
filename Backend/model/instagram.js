const mongoose = require("mongoose");

const instagramUserSchema = new mongoose.Schema({

name:String,
username:String,
instagramId:String,
followers:Number,
following:Number,
posts_count:Number,
bio:String,
avatar:String,
verified:Boolean,

posts: [
    {
      id: String,
      shortcode: String,
      link: String,
      image: String,
      caption: String
    }
  ]

},{timestamps:true});

module.exports = mongoose.model("InstagramUser",instagramUserSchema);