import { Component, OnInit } from '@angular/core';
import { Match, GameType } from '../match';
import { MatchService } from '../match-service.service';
import { LogService } from '../log-service.service';

@Component({
  // selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  match = new Match();
  gameOptions = Array<GameType>()

  constructor(private matchService:MatchService, private logger:LogService) {}

  ngOnInit() {
    this.gameOptions = this.matchService.getMyGameOptions()
  }

  onSubmit() {
    //alert('Thanks for submitting! Data: ' + JSON.stringify(this.game));
    this.logger.log(this.match)
  }

}
