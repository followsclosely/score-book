import { Injectable } from '@angular/core';
import { Match, GameType } from './match';
import { LogService } from './log-service.service';


@Injectable()
export class MatchService {

  private sequence:number = 1;
  private matches = new Map<number, Match>();

  //matches: Match[] = [];

  gameOptions = [
    new GameType("generic", "Azule",    2, false, -1),
    new GameType("chess",   "Chess",   2, false, -1), 
    //new GameType("drmario", "Dr. Mario"), 
    new GameType("hearts",  "Hearts",  4, false, 100),
    new GameType("rook",    "Rook",    2, true, 500)
  ] 

  constructor(
    private logger:LogService
  ) { }

  getMyGameOptions(){
    return this.gameOptions
  }

  addMatch(match:Match){
    match.id = this.sequence++;
    this.matches.set(match.id, match);
    this.logger.log("Saving Match", match);
  }

  getMatch(id:number){
    return this.matches.get(id);
  }

}