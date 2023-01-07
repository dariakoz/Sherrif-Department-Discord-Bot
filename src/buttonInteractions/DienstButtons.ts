import { ButtonInteraction, Client, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import * as Date from "../types/Time";

const DienstInteraction = async (client: Client, interaction: ButtonInteraction) => 
{
    let beginningChannel = "889072560568926208";
    let endingChannel = "889072636922048552";

    if (interaction.component.label == "EINTRAGEN")
    {
        await interaction.deferUpdate();

        await (client.channels.cache.get(beginningChannel) as TextChannel)
            .send(`<@${interaction.user.id}> meldet sich zum Dienst am ${Date.getDate()} um ${Date.getTime()} Uhr.`);
    }

    if (interaction.component.label == "AUSTRAGEN") 
    {
        await interaction.deferUpdate();

        await (client.channels.cache.get(endingChannel) as TextChannel)
        .send(`<@${interaction.user.id}> beendet den Dienst am ${Date.getDate()} um ${Date.getTime()} Uhr.`);
    }
}

export default DienstInteraction;