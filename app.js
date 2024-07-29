const express = require("express");
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use('/user/',userRoutes);
app.use('/post',postRoutes);
app.use('/uploads',express.static('uploads'))
module.exports = app;
