import { Component, OnInit } from '@angular/core';
import { Game, GameType } from '../game';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  game = new Game();

  factionOptions = Array.from({length: 20}, (_, i) => i + 1)
  gameOptions = [
    new GameType("Chess"), 
    new GameType("Dr. Mario"), 
    new GameType("Hearts")
  ] 

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.game));
  }
}
