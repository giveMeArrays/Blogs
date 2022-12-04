const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema({
    title:{
        type: String,
        required : true
    },
    body:{
        type: String,
        required: true
    },
    pciture: String
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;