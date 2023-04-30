import {BaseCommandInteraction, Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, MessagePayload, TextChannel} from "discord.js";
import { Command } from "../types/Command";
import { IDisplayDienst } from "../types/Dienst";

// export let myEmbed: MessageEmbed;
// export let id: string;
export let dienstMessage = {} as IDisplayDienst;

export const Dienst: Command = {
    name: "dienstbutton",
    description: "Returns a button in each channel",
    type: "CHAT_INPUT",
    options: [
        {
            name: "channel",
            description: "choose the channel",
            type: "CHANNEL",
            required: true,
        }
    ],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const channelId = interaction.options.data[0].value as string;

        interaction.followUp(
            {
                content: "Test",
            }
        );

        dienstMessage.embed = new MessageEmbed()
            .setTitle('Dienstdokumentation')
            .setDescription('Dokumentiere mit ✅ oder ❌ deine Dienstzeit!')
            .addFields(
                { name: "Sheriff's im Dienst", value: 'Keine Spieler im Dienst' },
            )
            .setFooter({
                text: "LSSD Führungsebene",
                iconURL: interaction.guild.iconURL(),
            })
            .setAuthor({
                name: "LSSD Führungsebene",
                iconURL: interaction.guild.iconURL(),
            })
            .setColor("ORANGE")

        // Ein ActionRow-Objekt erstellen, das zwei Buttons enthält
        const actionRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Eintragen')
                    .setStyle(3)
                    .setEmoji("✅")
                    .setCustomId("onDienst"),
                new MessageButton()
                    .setLabel('Austragen')
                    .setStyle(4)
                    .setEmoji("❌")
                    .setCustomId("offDienst"),
            );

        dienstMessage.message = await ( client.channels.cache.get(channelId) as TextChannel ).send(
            { 
                embeds: [dienstMessage.embed], 
                components: [actionRow] 
            });
    }
};