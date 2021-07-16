import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

import { Match, GameType } from '../match';
import { MatchService } from '../match-service.service';
import { LogService } from '../log-service.service';

import { GroupService } from '../group.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  match = new Match();
  gameOptions = Array<GameType>()

  constructor(
    private dialogRef:  MatDialogRef<MatchFormComponent>,
    private matchService:MatchService, 
    private groupService:GroupService,
    private logger:LogService
    ) {}

  ngOnInit() {
    this.gameOptions = this.matchService.getMyGameOptions();
    Array.prototype.push.apply(this.match.availablePlayers, this.groupService.getAllPlayers());
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

  gameTypeChanged(event){
    this.match.factionCount = this.match.type.defaultFactionCount;
    this.match.sharedFactions = this.match.type.defaultSharedFactions;
  }

}
