const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const short = require("short-uuid");
const todos = require("../store");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-todo")
    .setDescription("Create a new todo")
    .addStringOption((op) =>
      op.setName("name").setDescription("Todo name").setRequired(true)
    )
    .addBooleanOption((op) =>
      op.setName("isdone").setDescription("Todo status").setRequired(true)
    ),

  execute: (interaction) => {
    const name = interaction.options.getString("name");
    const isDone = interaction.options.getBoolean("isdone");
    const todoId = short.generate();

    todos.push({ name, status: isDone, id: todoId });

    const embed = new EmbedBuilder()
      .setColor("#32CD32") 
      .setTitle("Todo Added!")
      .setDescription(`Your new todo has been added successfully.`)
      .addFields(
        { name: "Todo Name", value: name, inline: true },
        { name: "Status", value: isDone ? "Done" : "Todo", inline: true },
        { name: "Todo ID", value: `\`${todoId}\``, inline: true }
      )
      .setTimestamp()

    return interaction.reply({ embeds: [embed] });
  },
};
