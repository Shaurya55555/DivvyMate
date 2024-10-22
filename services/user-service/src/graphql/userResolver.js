// userResolver.js
const userService = require('../services/userService');

module.exports = {
  Query: {
    getUser: async (_, { id }) => {
      return await userService.getUserById(id);
    }
  },
  Mutation: {
    createUser: async (_, { name, email, phone }) => {
      return await userService.createUser(name, email, phone);
    }
  }
};
