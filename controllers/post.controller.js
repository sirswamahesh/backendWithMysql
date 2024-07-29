const db = require("../models");
const uuid = require("uuid");
const slugify = require("slugify");
const validatePost = require("../validations/postValidation");

const addPost = async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;
    // Validate user input
    const { error } = validatePost(data);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }
    let imageUrl;
    if (file) {
      imageUrl = "http://localhost:3000/uploads/" + file.filename;
    }else{
        imageUrl=data.image_url
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    // Generate slug_key from the title
    const slugKey = slugify(data.title, { lower: true, strict: true });

    // Create the post record in the database
    const post = await db.post.create({
      id: uuid.v1(),
      ...data,
      image_url: imageUrl,
      slug_key: slugKey,
    });

    res.status(201).json({ message: "success", data: post });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "false", error });
  }
};

module.exports = addPost;

module.exports = addPost;
