import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialogRef} from '@angular/material';

import { Match, GameType, Faction } from '../match';
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
  gameOptions = Array<GameType>();
  currentFaction = 1;
  public faction = new Faction();

  constructor(
    private dialogRef:  MatDialogRef<MatchFormComponent>,
    private matchService:MatchService, 
    private groupService:GroupService,
    private logger:LogService,
    private location: Location,
    private router: Router,
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
    this.matchService.addMatch(this.match);
    this.dialogRef.close();
    
    this.router.navigate(['scorecard', this.match.type.path, this.match.id]);
    //this.location.go('/scorecard/'+this.match.type.path+'/'+ this.match.id);
  }

  gameTypeChanged(event){
    this.match.factionCount = this.match.type.defaultFactionCount;
    this.match.sharedFactions = this.match.type.defaultSharedFactions;
    this.match.maxPoints = this.match.type.defaultMaxPoints;
  }

  addPlayer(player, isAdd){
    if( isAdd ){
      this.match.addPlayer(player);
    } else {
      this.match.removePlayer(player);
    }
  }

  addPlayerToFaction(player, isAdd){
    if( isAdd ){
      if( this.match.factions.length < this.currentFaction ){
        this.match.factions.push(this.faction);
      }
      this.faction.addPlayer(player);
    } else {
      this.faction.removePlayer(player);
    }
  }

  onSubmitFaction(){
    if( this.match.factions.length == this.match.factionCount){
      this.onSubmit();
    } else {

      //Disable the players already in a match
      this.match.availablePlayers = this.match.availablePlayers.filter( player => this.faction.players.indexOf( player ) == -1);

      this.faction = new Faction();
      this.currentFaction++;
    }
  }
}
