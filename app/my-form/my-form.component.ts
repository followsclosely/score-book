import { Component, OnInit } from '@angular/core';
import { Game, GameType } from '../game';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  game = new Game();

  //todo: This should be a customizable parameter
  factionOptions = Array.from({length: 20}, (_, i) => i + 1)
  
  //This should come from a service
  gameOptions = [
    new GameType("Chess", 2), 
    new GameType("Dr. Mario"), 
    new GameType("Hearts", 4)
  ] 

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.game));
  }
}
