const {SlashCommandBuilder, Status} = require("discord.js");
const short = require("short-uuid");
const todos = require("../store");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-todo")
        .setDescription("Create To-Do")
        .addStringOption((op) =>
            op.setName("name").setDescription("todo name").setRequired(true)
         )
         .addBooleanOption(op => op.setName("isdone").setDescription("todo status").setRequired(true)
        ),
    execute: (interaction) => {

        const name = interaction.options.getString("name");
        const isdone = interaction.options.getBoolean("isDone");
        const toDoID = short.generate();

        todos.push(name, isdone, toDoID);
        interaction.reply("ToDo Added");
        console.log(name, isdone);

        },
    
}