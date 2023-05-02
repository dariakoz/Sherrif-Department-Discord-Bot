import { BaseCommandInteraction, Client, CommandInteraction } from "discord.js";
import { waitForDebugger } from "inspector";
import DienstDataSQL from "../dienst-evaluator/sql.CurrentDienst";
import { Command } from "../types/Command";

export const OffDuty: Command = {
    name: "offduty",
    description: "Nutze diesen Command, wenn beim Eintragen steht: 'Du bist noch nicht eingetragen!'",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        await DienstDataSQL.setOffDuty({playerId: interaction.user.id});

        interaction.deleteReply();
    }
};
