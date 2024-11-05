const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Todos = require("../store");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("all-todos")
    .setDescription("Get all todos")
    .addStringOption((op) =>
      op
        .setName("todo-id")
        .setRequired(false)
        .setDescription("Or get a todo with unique id")
    ),

  execute: (interaction) => {
    const todoId = interaction.options.getString("todo-id");

    if (todoId) {
      const todo = Todos.find((t) => t.id == todoId);

      if (!todo) {
        return interaction.reply({
          content: "Todo not found!",
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setColor("#0099FF") 
        .setTitle(`Todo Details - ID: ${todo.id}`)
        .addFields(
          { name: "Name", value: todo.name, inline: true },
          { name: "Status", value: todo.status ? "Todo" : "Done", inline: true }
        )
        .setTimestamp()

      return interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor("#FFD700")
        .setTitle("All Todos")
        .setDescription("Here's the list of all your todos:");

      if (Todos.length === 0) {
        embed.addFields({ name: "Todos", value: "Empty list", inline: false });
      } else {
        Todos.forEach((t) => {
          embed.addFields({
            name: `Todo ID: ${t.id}`,
            value: `**Name:** ${t.name}\n**Status:** ${t.status ? "Todo" : "Done"}`,
            inline: false,
          });
        });
      }

      return interaction.reply({ embeds: [embed] });
    }
  },
};
