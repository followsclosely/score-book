import {formatDate} from '@angular/common';
import { Player } from './player';

export class Faction {
  public players = Array<Player>()
  constructor(
    public name?: string,
  ) {}

  addPlayer(player:Player){
    this.players.push(player);
  }
  removePlayer(player:Player){
    var index = this.players.indexOf(player);
    if( index != -1 ){
      this.players.splice(index, 1);
    }
  }
}

export class GameType {
  constructor(
    public path: string,
    public name?: string,
    public defaultFactionCount?: number,
    public defaultSharedFactions?: boolean,
    public defaultMaxPoints?: number,
  ) {}
}

export class Match {

  //Array.prototype.push.apply(a, b);
  public availablePlayers = Array<Player>()
  public factions = Array<Faction>()

  constructor(
    public id?: number,
    public type?: GameType,
    public gameTypeNew?: GameType,
    public dateTime: string = formatDate(Date.now(), 'yyyy-MM-dd hh:mm', 'en-US'),
    public factionCount?: number,
    public sharedFactions?: boolean,
    public maxPoints?: number,
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
