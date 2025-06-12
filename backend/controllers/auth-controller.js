const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "All fields are required" });

  const { fullName, username, email, password, profileImageUrl } = req.body;

  // Validate required fields
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Username validation
  const usernameRegex = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Invalid username. Only alphanumeric characters and hyphens are allowed. No blank spaces.",
    });
  }

  // Optional: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username not available. Try another one",
      });
    }

    // Create user
    const user = await User.create({
      fullName,
      username,
      email,
      password,
      profileImageUrl,
    });

    // Respond with token
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "All fields are required" });

  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Optional: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user: {
        ...user.toObject(),
        totalPollsCreated: 0,
        totalPollsVotes: 0,
        totalPollsBookmarked: 0,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};

//Get User Info
exports.getUserInfo = async (req, res) => {};
