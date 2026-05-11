const moongose =  require("mongoose");

const facebookSchema = new moongose.Schema({

    name : String,
    username : String,
    facebookId : String,
    url : String,
    followers : Number,
    following : Number,
    postsCount : Number,
    avatar : String,
    verified : Boolean,
    description : String,

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

module.exports = moongose.model("facebookdata",facebookSchema);