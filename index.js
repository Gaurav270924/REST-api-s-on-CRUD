const express = require("express");
const app = express();
const path = require("path");
const { v4:uuidv4 }=require("uuid");
const methodOverride=require("method-override")


// const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("__method"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id:uuidv4(),
     username: "gaurav", 
  content: "good boy" 
  },
  { 
    id:uuidv4(),
    username: "hamza", 
  content: "nice boy" 
  },
  {
    id:uuidv4(),
    username: "aman",
    content: "bad boy",
  },
];
//delete post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
  });

//update ppost
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});
//edit post
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
//create and new route---------------
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
  });
  
  //redirect
  app.post("/posts",(req,res)=>{
   let {username,content}= req.body;
   let id=uuidv4();
   posts.push({id,username,content});
  res.redirect("/posts");
  });
  //------------------
  
  //show route
  app.get("/posts/:id",(req,res)=>{
     let {id}=req.params;
     let post=posts.find((p)=>id===p.id);
     res.render("show.ejs",{ post });
   });

  //all posts------------
  app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
  });
  //-----------------
  
  app.listen(8080, () => {
    console.log("Listening on port : 8080");
  });