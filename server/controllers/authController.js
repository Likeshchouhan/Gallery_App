const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  console.log("new user", user)
  res.json({ message: "Registered successfully" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ userId: req.body.userId });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  console.log("running");
  console.log(req.body);

  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "userId and password required" });
  }

  try {
    const user = await User.findOne({ userId: Number(userId) });

    console.log("user found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashed password:", hashedPassword);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ 
      resetPasswordToken: token, 
      resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

