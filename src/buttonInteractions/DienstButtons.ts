import { ButtonInteraction, Client, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import CurrentDienst from "../dienst-evaluator/CurrentDienst";
import * as myDate from "../types/Time";

const DienstInteraction = async (client: Client, interaction: ButtonInteraction) => 
{
    let beginningChannel = "1061281906819350539";
    let endingChannel = "1061281996229316618";
    let dienstLoggerChannel = "1061257223059288085";

    if (interaction.component.label == "EINTRAGEN")
    {
        await interaction.deferUpdate();

        var playerData = CurrentDienst.getPlayer(interaction.user.id);

        if (!playerData)
        {
            CurrentDienst.setNewPlayer({
                playerId: interaction.user.id,
                startTime: myDate.getTime(),
            });

            await (client.channels.cache.get(beginningChannel) as TextChannel)
                .send(`<@${interaction.user.id}> meldet sich zum Dienst am ${myDate.getDate()} um ${myDate.getTime()} Uhr.`);
        }
        else
        {
            await interaction.followUp({
                content: "Du bist schon eingetragen!",
                ephemeral: true,
            })
        }
    }

    if (interaction.component.label == "AUSTRAGEN") 
    {
        await interaction.deferUpdate();

        var playerData = CurrentDienst.getPlayer(interaction.user.id);

        if (playerData)
        {
            var playerStartTime = myDate.toDate(playerData.startTime);
            var playerEndTime = new Date();
            var playingTime = Math.round(-1 *((playerStartTime.getTime() - playerEndTime.getTime()) /60000));

            CurrentDienst.deleteUser(interaction.user.id);
            await (client.channels.cache.get(dienstLoggerChannel) as TextChannel)
            .send(`<@${playerData.playerId}> hat ${playingTime} Minuten gespielt.`);


            await (client.channels.cache.get(endingChannel) as TextChannel)
            .send(`<@${interaction.user.id}> beendet den Dienst am ${myDate.getDate()} um ${myDate.getTime()} Uhr.`);
        }
        else
        {
            await interaction.followUp({
                content: "Du bist noch nicht eingetragen!",
                ephemeral: true,
            })
        }
    }
}

export default DienstInteraction;