const moongose =  require("mongoose");

const tiktokuserSchema = new moongose.Schema({

    name : String,
    username : String,
    tiktokId : String,
    followers : Number,
    following : Number,
    likes : Number,
    videos : Number,
    avatar : String,
    verified : Boolean,
    description : String,
    posts_count : Number,

    posts : [
        {
            id : String,
            link : String,
            thumbnail : String,
            image : String,
            cover : String,
            likes : Number,
            shares : Number,
            comments : Number
        }
    ]
},{timestamps:true});

module.exports = moongose.model("tiktokdata",tiktokuserSchema);