const express = require("express");
const router = express.Router();
const addPost = require("../controllers/post.controller");
const upload = require("../middlewares/upload");
const validatePost = require('../validations/postValidation')

router.post("/",upload.single('image'), addPost);

module.exports = router;