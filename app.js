const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true})

const userSchema = {
  name : String,
  companyName : String,
  email: String,
  Telephone: Number,
  password: String
};

const User = new mongoose.model("User", userSchema)
app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});



app.get('/logout', function(req, res) {
  req.logout();
  req.session = null;
  res.redirect('/');
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req,res){
  const newUser = new User({
    name : req.body.username,
  companyName: req.body.companyName,
  email: req.body.email,
  tel: req.body.Telephone,
  password: req.body.password
  });

  newUser.save(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render("account");
    }
  });
});

app.post("/login", function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("account");
        }
      }
    }
  });
});



app.listen(3000, function(){
  console.log("Server Started at port 3000.");
});
