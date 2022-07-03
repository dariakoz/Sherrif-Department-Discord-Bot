import { Client } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
    
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);
        
        client.user.setActivity({
            name: "sich das Leistellenblatt an!",
            type: "WATCHING",
            url: "https://docs.google.com/spreadsheets/d/1f5aUnAbpEDQHi9NTBtW9MAVv0Vtxt2vCSiybuXRAxwc/edit#gid=1494697927",
        })

        console.log(`${client.user.tag} is online!`);
    });

};