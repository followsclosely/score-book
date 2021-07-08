import { Injectable } from '@angular/core';
import { GameType } from './game';

@Injectable()
export class MatchServiceService {

  gameOptions = [
    new GameType("Chess", 2), 
    new GameType("Dr. Mario"), 
    new GameType("Hearts", 4)
  ] 

  constructor() { }

  getMyGameOptions(){
    return this.gameOptions
  }
}