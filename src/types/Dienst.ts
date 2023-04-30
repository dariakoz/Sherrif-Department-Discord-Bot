import { Message, MessageEmbed } from "discord.js";

export interface IDienstData {
    playerId: string,
    startTime?: string,
    end?: string,
}

export interface IDisplayDienst {
    embed: MessageEmbed,
    channelId: string,
    message: Message
}