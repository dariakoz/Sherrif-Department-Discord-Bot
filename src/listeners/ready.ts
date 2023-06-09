import { ActivityType, Client } from "discord.js";
import { Commands } from "../Commands";
import { type } from "os";

export default (client: Client): void => {
    
    client.on("ready", async () => {
        
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);
        
        client.user.setActivity({
            name: "Test",
            url: "https://docs.google.com/spreadsheets/d/1f5aUnAbpEDQHi9NTBtW9MAVv0Vtxt2vCSiybuXRAxwc/edit#gid=889788368",
            type: ActivityType.Watching
        })

        console.log(`${client.user.tag} is online!`);
    });

};