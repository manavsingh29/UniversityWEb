const express = require("express");
const bodyParser  = require("body-parser");
const mongoose = require("mongoose");
const encrypt= require("mongoose-encryption")

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

 mongoose.connect("mongodb://localhost:27017/university",{ useNewUrlParser:true})

  const schema = new mongoose.Schema({
     name : String,
     password : String,
      email :String,
      phonenumber:String,
      state: String,

  })
  const secret= "ThisIsOurSecret";
  schema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});
  
  
  const User = new mongoose.model("User",schema);

  app.set("view engine", "ejs");
  
  
app.get("/",(req,res)=>{
    
    res.render("home");
})


app.get("/register",(req,res)=>{

    res.render("register");
})

app.post('/register',(req,res)=>{

    const newUser = new User({
        name : req.body.name,
        password : req.body.password,
        email: req.body.email,
        phonenumber :  req.body.phonenumber,
        state : req.body.state
    })

    newUser.save((err)=>{
 if(err){
     console.log(err);
 }else{
     res.render("login");
 }

    })
    

})

app.get("/login",(req,res)=>{
    
    res.render("login");
})

app.post("/login",(req,res)=>{ 
    
    name = req.body.name;
    password = req.body.password
    
    User.findOne({name:name},(err,data)=>{
        
        if (err) {
            console.log(err);
            
        } else {
            if (data) {
                if(data.password === password) {
                    res.render("portal");
                }
            }
        }
    })
})
app.listen(4000,()=>{
console.log(" the server is running  on port 3000");


})





