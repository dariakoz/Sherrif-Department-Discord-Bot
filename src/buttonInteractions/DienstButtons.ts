import { ButtonInteraction, Client, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import * as Date from "../types/Time"

const DienstInteraction = async (client: Client, interaction: ButtonInteraction) => 
{
    if (interaction.component.label == "EINTRAGEN")
    {
        await interaction.reply({
            ephemeral: true,
            content: "Du hast dich eingetragen!",
        });

        await (client.channels.cache.get("889072560568926208") as TextChannel)
            .send(`<@${interaction.user.id}> meldet sich zum Dienst am ${Date.getDate()} um ${Date.getTime()} Uhr.`);
    }

    if (interaction.component.label == "AUSTRAGEN") 
    {
        const Versehen = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Versehen')
					.setStyle('PRIMARY'),
		);

        await interaction.reply({
            ephemeral: true,
            content: "Du hast dich ausgetragen!",
            components: [Versehen]
        });

        await (client.channels.cache.get( "889072636922048552") as TextChannel)
        .send(`<@${interaction.user.id}> beendet den Dienst am ${Date.getDate()} um ${Date.getTime()} Uhr.`);
    }
}

export default DienstInteraction;