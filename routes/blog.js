const {Router} = require('express');
const multer =require('multer');
const Blog = require('../models/blog');
const path = require('path');
const route = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const upload = multer({ storage: storage });

route.get("/add-new",(req,res)=>{
    return res.render('addBlogs',{
        user : req.user,
    });
});

route.post("/",upload.single("coverImage"),async(req,res)=>{
    const { title, body } = req.body;
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
  });
  

module.exports = route;