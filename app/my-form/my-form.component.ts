import { Component, OnInit } from '@angular/core';
import { Game, GameType } from '../game';
import { MatchServiceService } from '../match-service.service';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  game = new Game();
  matchServiceService:MatchServiceService

  //todo: This should be a customizable parameter
  //factionOptions = Array.from({length: 20}, (_, i) => i + 1)
  
  gameOptions = []

  constructor(matchServiceService:MatchServiceService) {
    this.matchServiceService = matchServiceService
  }

  ngOnInit() {
    this.gameOptions = this.matchServiceService.getMyGameOptions()
  }

  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.game));
  }

}
