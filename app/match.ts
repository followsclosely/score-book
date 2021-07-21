import {formatDate} from '@angular/common';
import { Player } from './player';

export class Faction {
  public players = Array<Player>()
  constructor(
    public name?: string,
  ) {}
}

export class GameType {
  constructor(
    public name?: string,
    public defaultFactionCount?: number,
    public defaultSharedFactions?: boolean,
  ) {}
}

export class Match {

  //Array.prototype.push.apply(a, b);
  public availablePlayers = Array<Player>()
  public factions = Array<Faction>()

  constructor(
    public id?: number,
    public type?: string,
    public gameTypeNew?: string,
    public dateTime: string = formatDate(Date.now(), 'yyyy-MM-dd hh:mm', 'en-US'),
    public factionCount?: number,
    public sharedFactions?: boolean,
  ) {}

  addPlayer(player:Player){
    var faction = new Faction(player.name);
    faction.players.push(player);
    this.factions.push(faction);
  }

  removePlayer(player:Player){
    for (var i = this.factions.length - 1; i >= 0; i--) {
      if (this.factions[i].players.includes(player)) {
        this.factions.splice(i, 1);
      }
    }
  }

  capacity(){
    return (this.factionCount - this.factions.length);
  }
}
