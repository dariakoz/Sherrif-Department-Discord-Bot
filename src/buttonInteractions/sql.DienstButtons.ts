import { ButtonInteraction, Client } from "discord.js";
import DienstDataSQL from "../dienst-evaluator/sql.CurrentDienst";
import * as myDate from "../types/Time";
import { dienstMessage } from "../commands/Dienst";

const DienstInteractionSQL = async (client: Client, interaction: ButtonInteraction) => 
{
    //const playerData = await DienstDataSQL.getPlayer({playerId: interaction.user.id});
    const playerOnDuty = await DienstDataSQL.isPlayerOnDuty({playerId: interaction.user.id});
    var nickname = interaction.guild.members.cache.get(interaction.user.id).nickname

    if (interaction.customId == "onDienst")
    {
        await interaction.deferUpdate();

        if (!playerOnDuty)
        {
            //safe new player
            DienstDataSQL.setNewPlayer({
                playerId: interaction.user.id,
                playerName: nickname,
            });

            //register new player in embed list
            try {
                if(dienstMessage.embed.data.fields[0].value == "Keine Spieler im Dienst")
                {
                    dienstMessage.embed.data.fields[0].value = `${nickname} seit ${myDate.getTime()} Uhr`;
                }
                else
                {
                    dienstMessage.embed.data.fields[0].value += `\n${nickname} seit ${myDate.getTime()} Uhr`;
                }
                await dienstMessage.message.edit(
                {
                        embeds: [dienstMessage.embed],
                });
            } catch (error) {
                console.error("Die embed-list konnte nicht geupdatet werden");
                interaction.followUp({
                    content: "Die Liste hat ein Hänger. Du wirst aber in die Datenbank eingetragen",
                    ephemeral: true,
                })
            }
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

        if (playerOnDuty)
        {
            //embed list
            //filter string and if no player is a Sheriff
            try {
                const playersString = dienstMessage.embed.data.fields[0].value;
                const filteredString = playersString
                    .split('\n')
                    .filter(line => !line.includes(nickname))
                    .join('\n');
                
                if (filteredString)
                {
                    dienstMessage.embed.data.fields[0].value = filteredString;
                }
                else
                {
                    dienstMessage.embed.data.fields[0].value = "Keine Spieler im Dienst";
                }
                await dienstMessage.message.edit(
                {
                    embeds: [dienstMessage.embed],
                });
            } catch (error) {
                console.error("Die embed-list konnte nicht geupdatet werden");
                interaction.followUp({
                    content: "Die Liste hat ein Hänger. Du wirst aber aus der Datenbank ausgetragen",
                    ephemeral: true,
                })
            }

            //delete exit player from object
            DienstDataSQL.deletePlayer({playerId: interaction.user.id});
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

export default DienstInteractionSQL;