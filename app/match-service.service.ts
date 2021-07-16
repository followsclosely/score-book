import { Injectable } from '@angular/core';
import { GameType } from './match';

@Injectable()
export class MatchService {

  gameOptions = [
    new GameType("Chess", 2), 
    new GameType("Dr. Mario"), 
    new GameType("Hearts", 4),
    new GameType("Rook", 4, true)
  ] 

  constructor() { }

  getMyGameOptions(){
    return this.gameOptions
  }

}