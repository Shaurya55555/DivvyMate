// userController.js

const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newUser = await userService.createUser(name, email, phone);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
