const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./Models/Blog");
const bodyParser = require("body-parser");


const App = express();
App.listen(3000);

App.use(bodyParser.urlencoded({ extended: false }));
App.use(express.json());

const dbURI = "mongodb+srv://BlogCv:BlogCv@cluster0.k9qj0ii.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})

App.use(express.static('Scripts'));

App.get("/", (req, res) =>{
    res.sendFile("./views/Blog.html", {root : __dirname});
});

App.post("/addBlog", (req, res) =>{
    const blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        picture: "http://unsplash.it/400"
    });

    console.log(req.body)

    blog.save()
    .then(result => {res.send(result)})
    .catch(err => console.log(err));
});

App.delete("/deleteBlog", (req, res) =>{
    Blog.deleteOne({_id: req.body.id})
    .then(data =>{
        res.send(JSON.stringify(data))
    })
    .catch(err => console.log(err))
});

App.get("/getAllBlogs", (req, res) =>{
    Blog.find()
    .then(data =>{
        res.send(JSON.stringify(data))
    })
    .catch(err => console.log(err))
});

App.get("/viewBlog", (req, res) =>{
    res.sendFile("./views/viewBlog.html", {root : __dirname});
});

App.post("/Article", (req, res) =>{
    console.log(req.body.id)
    Blog.findById(req.body.id)
    .then(data =>{
        res.send(JSON.stringify(data))
        console.log(data)
    })
    .catch(err => console.log(err))
});