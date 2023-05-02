import { IDienstData } from "../types/Dienst";
import config from "../config/config.json"
const sqlConfig = config.mysqlConfig;
import mysql from 'mysql2/promise';

type Row = mysql.RowDataPacket;
type dbDefaults = Row[];

class DienstDataSQL {
    private connection: mysql.Pool;

    constructor() {
        this.connection = mysql.createPool({
            host: sqlConfig.host,
            user: sqlConfig.user,
            password: sqlConfig.password,
            database: sqlConfig.database,
        });
    }

    public async setNewPlayer(playerData: IDienstData) 
    {
        try
        {
            // Check if player already exists in the players table
            const querySelect = `SELECT * FROM players WHERE discord_id='${playerData.playerId}'`
            const [rows] = await this.connection.query(querySelect);
            if (rows[0] === undefined)
            {
                // If player doesn't exist, insert new player into players table
                await this.connection.query(`INSERT INTO players (name, discord_id) VALUES ('${playerData.playerName}','${playerData.playerId}')`);
            }

            // Insert new entry into dienstzeiten table with the player's ID and the current date and time
            const queryInsert = `INSERT INTO dienstzeiten (player_id, startzeit) 
                VALUES ((SELECT player_id FROM players WHERE discord_id='${playerData.playerId}'), NOW())`;
            await this.connection.query(queryInsert);
        } catch (error) {
            console.error('Failed to set new player:', error);
            throw error;
        }
    }

    public async deletePlayer(playerData: IDienstData)
    {
        try { 
            const queryRows = `SELECT * FROM players WHERE discord_id='${playerData.playerId}'`;
            const [rows] = await this.connection.query(queryRows);

            if (rows[0] !== undefined)
            {
                const playerId = rows[0].player_id;

                // Get the most recent dienstzeit for the player
                const [dienstRows] = await this.connection.query(
                    `SELECT * FROM dienstzeiten WHERE player_id=${playerId} ORDER BY startzeit DESC LIMIT 1`
                );

                if(dienstRows[0] !== undefined)
                {
                    // Calculate the total playtime
                    const startzeit = new Date(dienstRows[0].startzeit);
                    const endzeit = new Date();
                    const totalPlaytime = Math.round((endzeit.getTime() - startzeit.getTime()) / 1000);

                    // Update the dienstzeit entry with the endzeit and total playtime
                    const queryDienstzeit = `UPDATE dienstzeiten SET endzeit = NOW(), spielzeit = ${totalPlaytime} WHERE dienst_id=${dienstRows[0].dienst_id}`;
                    await this.connection.query(queryDienstzeit);

                    // Update the total playtime for the player in the players table
                    const queryTotalPlayTime = `UPDATE players SET gesamt_spielzeit = gesamt_spielzeit + ${totalPlaytime} WHERE player_id=${playerId}`;
                    await this.connection.query(queryTotalPlayTime);
                }
            }
        } catch (error) {
            console.error('Failed to delete player:', error);
            throw error;
        }
    }

    public async getPlayer(playerData: IDienstData): Promise<IDienstData>
    {
        try {
            const queryPlayer = `SELECT * FROM players WHERE discord_id='${playerData.playerId}'`;
            const [player] = await this.connection.query(queryPlayer);
            
            if (player[0] !== undefined)
            {
                return {
                    playerId: player[0].discord_id,
                    playerName: player[0].name,
                    totalTime: player[0].gesamt_spielzeit,
                } as IDienstData;
            }
        } catch (error) {
            console.error('Failed to get the desired player:', error);
            throw error;
        }
    }

    public async isPlayerOnDuty(playerData: IDienstData): Promise<boolean> 
    {
        try {
            const queryOnDuty = `SELECT * FROM dienstzeiten WHERE player_id = (SELECT player_id FROM players WHERE discord_id = '${playerData.playerId}') AND endzeit IS NULL`;
            const [player] = await this.connection.query(queryOnDuty);
            
            if (player[0] === undefined)
            {
                return false;
            }
            return true;
        } catch (error) {
            console.error('Failed to get the onDuty players:', error);
            throw error;
        }

    }

    public async setOffDuty(playerData: IDienstData)
    {
        const queryOffDuty = `UPDATE dienstzeiten 
        SET endzeit = NOW()
        WHERE endzeit IS NULL AND player_id = (SELECT player_id FROM players WHERE discord_id = '${playerData.playerId}');`;
        await this.connection.query(queryOffDuty);
    }

    public async countPlayersOnDuty(): Promise<number>
    {
        const query = `SELECT COUNT(*) AS count FROM dienstzeiten WHERE endzeit IS NULL;`
        const [result] = await this.connection.query(query);
        
        return result[0].count;
    }
}

export default new DienstDataSQL();