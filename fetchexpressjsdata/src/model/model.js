const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const playlist = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    cpassword:{
        type:String,
        require:true,
    },
});

playlist.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
    this.cpassword = undefined;
});

const playlistschema = new mongoose.model("fatchdata",playlist);
module.exports = playlistschema;