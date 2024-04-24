const express = require("express");
const app = express();
const port = 8000;
const path = require('path');
const bcrypt = require("bcrypt");
const hbs = require('ejs');
require('./db/connect');
const playlistschema = require("./model/model");
const staticpath = path.join("../template/views");
app.set("views",staticpath);
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.render("sign");
});
app.post("/empdata",async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
    if (password === cpassword) {
        const postdata = new playlistschema({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword,
        });
        const getdata = await postdata.save();
        res.render('index');
    }else{
        res.send("password are not matching....");
    }
    } catch (error) {
        res.send(error)
    }
});

app.listen(port,(err)=>{
    console.log('connected');
})