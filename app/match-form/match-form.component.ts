import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

import { Match, GameType } from '../match';
import { MatchService } from '../match-service.service';
import { LogService } from '../log-service.service';

import { GroupService } from '../group.service';
import { Player } from '../player';

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
    this.match.availablePlayers.length = 0;
    this.logger.log(this.match);
    this.dialogRef.close();
  }

  gameTypeChanged(event){
    this.match.factionCount = this.match.type.defaultFactionCount;
    this.match.sharedFactions = this.match.type.defaultSharedFactions;
  }

  addPlayer(player, isAdd){
    // this.logger.log('addPlayer('+player.name+', '+isAdd+')');
    if( isAdd ){
      this.match.addPlayer(player);
    } else {
      this.match.removePlayer(player);
    }

    // for (var i = this.match.factions.length - 1; i >= 0; i--) {
    //   this.logger.log(' - ' + this.match.factions[i].players[0].name);
    // }

  }
}
