import { ApplicationCommandType, Client, CommandInteraction } from "discord.js";
import DienstDataSQL from "../dienst-evaluator/sql.CurrentDienst";
import { Command } from "../types/Command";

export const OffDuty: Command = {
    name: "offduty",
    description: "Nutze diesen Command, wenn beim Eintragen steht: 'Du bist noch nicht eingetragen!'",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        await DienstDataSQL.setOffDuty({playerId: interaction.user.id});

        interaction.deleteReply();
    }
};
