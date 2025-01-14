import { ButtonInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder, TextChannel } from "discord.js";
import { Commands } from "../Commands";
import DienstInteractionSQL from "../buttonInteractions/sql.DienstButtons";


export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
        }

        else if (interaction.isButton())
        {
            //console.log(interaction);
            await handleButtonInteraction(client, interaction);
        }
        
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};



const handleButtonInteraction = async (client: Client, interaction: ButtonInteraction) => {
    DienstInteractionSQL(client, interaction);
}