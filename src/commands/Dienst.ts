import { CommandInteraction, Client, TextChannel, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType, ActionRow, ActionRowComponent, ComponentType} from "discord.js";
import { Command } from "../types/Command";
import { IDisplayDienst } from "../types/Dienst";

// export let myEmbed: MessageEmbed;
// export let id: string;
export let dienstMessage = {} as IDisplayDienst;

export const Dienst: Command = {
    name: "dienstbutton",
    description: "Returns a button in each channel",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel",
            description: "choose the channel",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const channelId = interaction.options.data[0].value as string;

        interaction.deleteReply();

        dienstMessage.embed = new EmbedBuilder()
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
            .setColor("Orange")

        // Ein ActionRow-Objekt erstellen, das zwei Buttons enthält

        const onDuty = new ButtonBuilder()
            .setLabel('Eintragen')
            .setStyle(3)
            .setEmoji("✅")
            .setCustomId("onDienst");

		const offDuty = new ButtonBuilder()
            .setLabel('Austragen')
            .setStyle(4)
            .setEmoji("❌")
            .setCustomId("offDienst");

        dienstMessage.message = await ( client.channels.cache.get(channelId) as TextChannel ).send(
            { 
                embeds: [dienstMessage.embed],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [onDuty, offDuty],
                    }
                ]
            }
        );
    }
};