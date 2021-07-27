import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AbstractRoundBasedGame, RoundDetails, AbstractRound } from '../abstract-round-based-game';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericRoundBasedGame extends AbstractRoundBasedGame<AbstractRound> implements OnInit {
  public match:Match = null;

  private roundDialogRef: MatDialogRef<GenericRoundComponent>;

  constructor(
    logger: LogService,
    protected route: ActivatedRoute,
    protected location: Location,
    protected matchService:MatchService, 
    protected dialog: MatDialog,
  ) { 
    super(logger);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.logger.log(id);
    this.match = this.matchService.getMatch(id);

    if( this.match == null)
    {
      this.match = new Match(
        id,
        new GameType("generic",  "Generic Game",  4),
        null,
        null,
        4,
        false
      );

      this.match.factions.push(new Faction("Matthew"));
      this.match.factions.push(new Faction("Estella"));

      this.addRound(new AbstractRound(1).push(10).push(3));
      this.addRound(new AbstractRound(2).push(0).push(23));
      this.addRound(new AbstractRound(3).push(26).push(26));
      this.dataSource.data = this.rounds;
    }

    super._ngOnInit(this.match);
  }

  openAddRoundDialog(){

    var round = new AbstractRound();
    this.match.factions.forEach(faction => {
      round.details.push(new RoundDetails(0));
    });

    this.roundDialogRef = this.dialog.open(GenericRoundComponent, { data: round } );
    this.roundDialogRef.componentInstance.parent = this;
  }

  openEditRoundDialog(round : AbstractRound){
    this.roundDialogRef = this.dialog.open(GenericRoundComponent, {
      data: round
    });
    this.roundDialogRef.componentInstance.parent = this;
  }
}

@Component({
  templateUrl: './generic-round.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericRoundComponent {

  public parent : GenericRoundBasedGame;
  public totalPoints = 0;

  constructor(
    private logger: LogService,
    private dialogRef:  MatDialogRef<GenericRoundComponent>,
    @Inject(MAT_DIALOG_DATA) public round : AbstractRound
  ) {}

  onScoreChange(event){
    this.totalPoints = this.round.getTotal();
  }

  onSubmit(){
    this.parent.addRound(this.round);
    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
}