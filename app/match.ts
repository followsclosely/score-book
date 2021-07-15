import {formatDate} from '@angular/common';
import { Player } from './player';

export class Match {

  //Array.prototype.push.apply(a, b);
  availablePlayers = Array<Player>()

  constructor(
    public id?: number,
    public type?: string,
    public gameTypeNew?: string,
    public dateTime: string = formatDate(Date.now(), 'yyyy-MM-dd hh:mm', 'en-US'),
    public factionCount?: number,
  ) {}
}

export class GameType {
  constructor(
    public name?: string,
    public defaultFactionCount?: number
  ) {}
}
