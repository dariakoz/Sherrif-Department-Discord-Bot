import * as config from "./config/config.json"
import { Client, ClientOptions } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

console.log("Bot is starting...");

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
});

ready(client);
interactionCreate(client);

client.login(config.TOKEN);