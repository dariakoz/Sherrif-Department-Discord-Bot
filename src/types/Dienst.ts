import { EmbedBuilder, Message} from "discord.js";

export interface IDienstData {
    playerId: string,
    playerName?: string,
    startTime?: string,
    end?: string,
    totalTime?: string,
}

export interface IDisplayDienst {
    embed: EmbedBuilder,
    channelId: string,
    message: Message
}