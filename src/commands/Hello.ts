import { BaseCommandInteraction, Client, CommandInteraction } from "discord.js";
import { Command } from "../types/Command";

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: "CHAT_INPUT",
    options: [
        {
            name: "content",
            description: "type ur content",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Vinzenz",
                    value: "Vinzenz"
                },
                {
                    name: "Konstantin",
                    value: "Konstantin"
                }
            ]
        }
    ],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const value = interaction.options.data[0].value
        const content = `${value} ist cool!`;

        await interaction.followUp({
            ephemeral: true,
            content: content
        });
    }
};
