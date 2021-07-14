import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

import { Match, GameType } from '../match';
import { MatchService } from '../match-service.service';
import { LogService } from '../log-service.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  match = new Match();
  gameOptions = Array<GameType>()

  constructor(
    private dialogRef:  MatDialogRef<MyFormComponent>,
    private matchService:MatchService, 
    private logger:LogService
    ) {}

  ngOnInit() {
    this.gameOptions = this.matchService.getMyGameOptions()
  }


  onStepOneSubmit(){

  }


  onSubmit() {
    //alert('Thanks for submitting! Data: ' + JSON.stringify(this.game));
    this.logger.log(this.match);
    this.dialogRef.close();
  }

  step2Complete = false;

  toggleStep2Complete() {
    this.step2Complete = !this.step2Complete;
  }

}
