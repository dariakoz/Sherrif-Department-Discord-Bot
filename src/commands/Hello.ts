import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, Client} from "discord.js";
import { waitForDebugger } from "inspector";
import { Command } from "../types/Command";

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "content",
            description: "type ur content",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Olaf",
                    value: "Olaf"
                },
                {
                    name: "Kevin",
                    value: "Kevin"
                }
            ]
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        
        //example code
        const value = interaction.options.data[0].value
        const content = `${value} ist cool!`;

        await interaction.followUp({
            ephemeral: true,
            content: content,
        });
    }
};
