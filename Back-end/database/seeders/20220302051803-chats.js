"use strict";

const models = require("../../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const users = await User.findAll({ limit: 2 })
    const chat = await Chat.create()
    await ChatUser.bulkCreate([
      {
        chatId: chat.id,
        userId: users[0].id
      },
      {
        chatId: chat.id,
        userId: users[1].id
      }
    ])

    await Message.bulkCreate([
      {
        message: 'hello baby one more time',
        chatId: chat.id,
        fromUserId: users[0].id
      },
      {
        message: 'goodbye baby one more time',
        chatId: chat.id,
        fromUserId: users[1].id
      },
      {
        message: 'long time no see baby one more time',
        chatId: chat.id,
        fromUserId: users[1].id
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
