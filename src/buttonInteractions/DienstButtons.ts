import { ButtonInteraction, Client, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import CurrentDienst from "../dienst-evaluator/CurrentDienst";
import * as myDate from "../types/Time";
import { dienstMessage } from "../commands/Dienst";

const DienstInteraction = async (client: Client, interaction: ButtonInteraction) => 
{
    let beginningChannel = "1061281906819350539";
    let endingChannel = "1061281996229316618";
    let dienstLoggerChannel = "1061257223059288085";
    var playerData = CurrentDienst.getPlayer(interaction.user.id);
    var nickname = interaction.guild.members.cache.get(interaction.user.id).nickname

    if (interaction.customId == "onDienst")
    {
        await interaction.deferUpdate();

        if (!playerData)
        {
            //safe new player
            CurrentDienst.setNewPlayer({
                playerId: interaction.user.id,
                startTime: myDate.getTime(),
            });

            //register new player in embed list
            if(dienstMessage.embed.fields[0].value == "Keine Spieler im Dienst")
            {
                dienstMessage.embed.fields[0].value = `${nickname} seit ${myDate.getTime()} Uhr`;
            }
            else
            {
                dienstMessage.embed.fields[0].value += `\n ${nickname} seit ${myDate.getTime()} Uhr`;
            }
            dienstMessage.message.edit(
            {
                    embeds: [dienstMessage.embed],
            });

            //logger
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

    if (interaction.customId == "offDienst") 
    {
        await interaction.deferUpdate();

        if (playerData)
        {
            var playerStartTime = myDate.toDate(playerData.startTime);
            var playerEndTime = new Date();
            var playingTime = Math.round(-1 *((playerStartTime.getTime() - playerEndTime.getTime()) /60000));


            //delete exit player from object
            CurrentDienst.deleteUser(interaction.user.id);


            //embed list
            //filter string
            const playersString = dienstMessage.embed.fields[0].value;
            const filteredString = playersString
                .split('\n')
                .filter(line => !line.startsWith("dariakoz"))
                .join('\n');
            
            //if no player is a Sheriff
            if (filteredString)
            {
                dienstMessage.embed.fields[0].value = filteredString;
            }
            else
            {
                dienstMessage.embed.fields[0].value = "Keine Spieler im Dienst";
            }
            dienstMessage.message.edit(
            {
                embeds: [dienstMessage.embed],
            });


            //logger
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