import { BaseCommandInteraction, Client, CommandInteraction, MessageEmbed, TextChannel  } from "discord.js";
import { Command } from "../types/Command";

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
        const value2 = interaction.options.data[0].value as string

        var embed = {
        "components": [
            {
            "type": 1,
            "components": [
                {
                "style": 3,
                "label": `EINTRAGEN`,
                "custom_id": `row_0_button_0`,
                "disabled": false,
                "emoji": {
                    "id": null,
                    "name": `✅`
                },
                "type": 2
                },
                {
                "style": 4,
                "label": `AUSTRAGEN`,
                "custom_id": `row_0_button_1`,
                "disabled": false,
                "emoji": {
                    "id": null,
                    "name": `❌`
                },
                "type": 2
                }
            ]
            }
        ],
        "embeds": [
            {
                "type": "rich",
                "title": "",
                "description": "",
                "color": 0xbb8900,
                "fields": [
                    {
                    "name": `Dienstdokumentation`,
                    "value": `Dokumentiere mit ✅ oder ❌ deine Dienstzeit!`
                    }
                ],
                "author": {
                    "name": `LSSD`,
                    "icon_url": interaction.guild.iconURL()
                },
                "footer": {
                    "text": "LSSD Führungsebene",
                    "icon_url": interaction.guild.iconURL(),
                }
            }
        ]};

        await interaction.followUp({
            ephemeral: false,
            content: "Gesendet",
        });

        await ( client.channels.cache.get(value2) as TextChannel ).send(embed);
    }
};



