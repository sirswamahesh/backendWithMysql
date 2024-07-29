const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().max(500).required(),
  categoryId: Joi.string().guid({ version:['uuidv1', 'uuidv4'] }).required(),
  userId: Joi.string().guid({ version: ['uuidv1', 'uuidv4'] }).required(),
  image_url: Joi.string().required(),
});

const validatePost = (data) => {
  return postSchema= postSchema.validate(data, { abortEarly: false });
};

module.exports = validatePost;
