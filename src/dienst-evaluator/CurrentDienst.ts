import { IDienstData } from "../types/Dienst"

class DienstData
{
    private currentPlayers: Array<IDienstData> = [];

    public setNewPlayer(data: IDienstData)
    {
        this.currentPlayers.push(data);
    }

    public getPlayers()
    {
        return this.currentPlayers;
    }

    public getPlayer(user: string): IDienstData
    {
        let player = this.currentPlayers.filter(i => i.playerId === user)[0];
        return player;
    }

    public deleteUser(user: string)
    {
        this.currentPlayers = this.currentPlayers.filter((i) => {
            i.playerId !== user;
        });
    }
}

export default new DienstData();