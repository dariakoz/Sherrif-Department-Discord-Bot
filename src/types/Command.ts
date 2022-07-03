import { BaseCommandInteraction, ButtonInteraction, ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";
import { RawMessageButtonInteractionData } from "discord.js/typings/rawDataTypes";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
    // buttonInteraction?: (client: Client, interaction: ButtonInteraction) => void;
};

