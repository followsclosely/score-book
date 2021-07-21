import { Injectable } from '@angular/core';
import { Match, GameType } from './match';


@Injectable()
export class MatchService {

  private sequence:number = 1;
  private matches = new Map<number, Match>();

  //matches: Match[] = [];

  gameOptions = [
    new GameType("chess",   "Chess",   2), 
    new GameType("drmario", "Dr. Mario"), 
    new GameType("hearts",  "Hearts",  4),
    new GameType("rook",    "Rook",    2, true)
  ] 

  constructor() { }

  getMyGameOptions(){
    return this.gameOptions
  }

  addMatch(match:Match){
    match.id = this.sequence++;
    this.matches.set(match.id, match);
  }

  getMatch(id:number){
    return this.matches.get(id);
  }

}