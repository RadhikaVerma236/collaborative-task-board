const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "Member",
  });

  return user;
};

module.exports = {
  registerUser,
};