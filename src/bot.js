
require('dotenv').config();
const {Client, IntentsBitField, User, Collection, REST, Routes} = require('discord.js');

const commands = require('./commands/index');
const token = process.env.TOKEN

const client = new Client({

    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessageReactions,
    ],

})

const bot = 
{

 GUILD_ID: process.env.GUILD_ID,
 CLIENT_ID: process.env.CLIENT_ID

}

client.on('messageCreate', (message) => {

    if(message.author.bot)
    {
        return;
    }

    if(message.content == "Hello"){
        message.reply("World");
    }

})

client.commands = new Collection();
const commandsStore = [];

commands.map(cmd => {
    client.commands.set(cmd.data.name, cmd);
    commandsStore.push(cmd.data.toJSON());
});

const rest = new REST().setToken(token);
(async () => {

    const data = await rest.put(
        Routes.applicationGuildCommands(bot.CLIENT_ID, bot.GUILD_ID),
        { body: commandsStore },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);

	await client.login(token);
    console.log(`🐘 ${client.user.username} online.`);

    client.on("interactionCreate", interaction => {

        if(!interaction.isCommand)
            return;

        const {commandName} = interaction;
        const command = client.commands.get(commandName);

        if(command)
        {
            command.execute(interaction);
        }
            else 
            {
                interaction.reply("Invalid command");
            }
    });
})();





