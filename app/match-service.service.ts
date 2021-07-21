import { Injectable } from '@angular/core';
import { Match, GameType } from './match';


@Injectable()
export class MatchService {

  private sequence:number = 1;
  private matches = new Map<number, Match>();

  //matches: Match[] = [];

  gameOptions = [
    new GameType("Chess", 2), 
    new GameType("Dr. Mario"), 
    new GameType("Hearts", 4),
    new GameType("Rook", 2, true)
  ] 

  constructor() { }

  getMyGameOptions(){
    return this.gameOptions
  }

  addMatch(match:Match){
    this.matches.set(this.sequence++, match);
  }

  getMatch(id:number){
    return this.matches.get(id);
  }

}