const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models")
const uuid = require("uuid");


const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await db.user.findOne({
      where: { email, name },
    });
    if (existinguser)
      return res.status(400).json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({id: uuid.v1(), name, email, password: hashedPassword });

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "user does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login };