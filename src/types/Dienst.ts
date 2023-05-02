import { Message, MessageEmbed } from "discord.js";

export interface IDienstData {
    playerId: string,
    playerName?: string,
    startTime?: string,
    end?: string,
    totalTime?: string,
}

export interface IDisplayDienst {
    embed: MessageEmbed,
    channelId: string,
    message: Message
}