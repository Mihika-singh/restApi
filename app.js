//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();
const port=process.env.PORT || 3000;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/contactDB",{useNewURLParser:true});
const contactSchema={
    name:String,
    email:String
};
const Contact=mongoose.model("Contact",contactSchema);
app.route("/contacts")
.get(function(req,res){
    Contact.find(function(err,foundContact){
        if(err){
            console.log(err);
        }
        else{
            res.send(foundContact);
        }
         
    });
})
.post(function(req,res){
    // console.log( );
    // console.log(req.body.email);
     const newContact=new Contact({
         name:req.body.name,
         email:req.body.email
     });
 newContact.save(function(err){
     if(err){
         console.log(err);
     }
     else{
         res.send("sucessfully added");
     }
 });
 })
 .delete(function(req,res){
    Contact.deleteMany(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.send("sucessfully deleted");
        }
    });
});
app.route("/contacts/:contactName")
 
 
.patch(function(req,res){
    Contact.updateOne(
        {title:req.params.contactName},
        {$set:req.body},
        function(err){
if(!err){
   res.send("updated");
}else{
res.send(err);
}
        }
        );
})


app.listen(port,function(){
    console.log("server runs at  port");
});