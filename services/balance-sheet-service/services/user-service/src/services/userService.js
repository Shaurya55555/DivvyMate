// userService.js
const User = require('../models/userModel');

exports.createUser = async (name, email, phone) => {
  try {
    const newUser = await User.create({ name, email, phone });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database Error');
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Database Error');
  }
};
