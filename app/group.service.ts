import { Injectable } from '@angular/core';

import { Player } from './player';
import { GameType } from './match';
import { LogService } from './log-service.service';

@Injectable()
export class GroupService {

  players: Player[] = [];

  constructor(
    private logger:LogService
  ) {
    this.players.push(new Player(1, "Matthew", "matthew@gmail.com"));
    this.players.push(new Player(2, "Estella", "estella@gmail.com"));
    this.players.push(new Player(3, "Hannah"));
    this.players.push(new Player(4, "Olivia"));
    this.players.push(new Player(5, "Emily"));
    this.players.push(new Player(6, "Jaron"));
    this.players.push(new Player(7, "Joel"));
  }

  public getAllPlayers(){
    return this.players;
  }

  public addPlayer(player:Player){
    this.logger.log(player);
    this.players.push(player);
  }
}