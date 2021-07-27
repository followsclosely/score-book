import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import {MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import { Player } from '../../player';

import { AbstractRoundBasedGame, RoundDetails, AbstractRound, RoundMode } from '../abstract-round-based-game';

import {
  Component, OnInit
} from '@angular/core';

export class Bid {
  constructor(
    public player? : Player,
    public points? : number,
    public trump?
  ){}
}

export class RookHand extends AbstractRound {
  constructor(
    number? : number,
    public bid : Bid = new Bid(),
  ){
    super(number);
  }

  setBid(player? : Player, points? : number, trump?){
    this.bid = new Bid(player, points, trump);
    return this; 
  }
}

@Component({
  selector: 'app-rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookComponent extends AbstractRoundBasedGame<RookHand> implements OnInit {

  public round:RookHand;

  public match:Match = null;
  public showPlayerNames = true;
  private roundDialogRef: MatDialogRef<RookRoundComponent>;

  constructor(
    logger: LogService,
    private route: ActivatedRoute,
    private location: Location,
    private matchService:MatchService, 
    private dialog: MatDialog,
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
        new GameType("rook",  "Rook"),
        null,
        null,
        2,
        true
      );

      var parents = new Faction("Parents");
      parents.addPlayer(new Player(100, "Matthew"));
      parents.addPlayer(new Player(101, "Estella"));
      this.match.factions.push(parents);

      var kids = new Faction("Kids");
      kids.addPlayer(new Player(102, "Hannah"));
      kids.addPlayer(new Player(103, "Olivia"));
      this.match.factions.push(kids);

      this.addRound(new RookHand(1).push(145).push(35).setBid(new Player(100, "Matthew"), 125, "green" ));
      this.addRound(new RookHand(1).push(20).push(160).setBid(new Player(102, "Hannah"), 135, "red" ));
      this.addRound(new RookHand(1).push(45).push(135).setBid(new Player(102, "Olivia"), 115, "black" ));
      //this.addRound(new RookHand(1).push(0).push(0).setBid(new Player(102, "Matthew"), 120, "yellow" ));
      this.dataSource.data = this.rounds;
  
    }

    this._ngOnInit(this.match);
    // this.columnsToDisplay.push("round");
    // this.match.factions.forEach(faction => {

    //   this.players.push(...faction.players);

    //   if( faction.name != null ){
    //     this.columnsToDisplay.push(faction.name);
    //   } else {
    //     this.columnsToDisplay.push(faction.players.map(p => p.name).join('/'));
    //   }

    // });
  }

  openAddRoundDialog(){
    this.roundDialogRef = this.dialog.open(RookRoundComponent);

    this.round = new RookHand();
    this.roundMode = RoundMode.Create;

    this.match.factions.forEach(faction => {
      this.round.details.push(new RoundDetails(0));
    });

    this.roundDialogRef.componentInstance.parent = this;
  }

  openEditRoundDialog(round : RookHand){
    this.logger.log("RookComponent#openEditRoundDialog: " + round.number);

    this.roundDialogRef = this.dialog.open(RookRoundComponent);

    this.round = round;
    this.roundMode = RoundMode.Edit;
    this.roundDialogRef.componentInstance.parent = this;

  }
}

@Component({
  templateUrl: './hand.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookRoundComponent {

  public parent : RookComponent;
  public totalPoints = 0;

  constructor(
    private logger: LogService,
    private dialogRef:  MatDialogRef<RookRoundComponent>
  ) { }

  onScoreChange(event){
    this.totalPoints = this.parent.round.getTotal();
  }

  onSubmit(){
    //this.logger.log(this.parent.dataSource);
    this.parent.addRound(this.parent.round);
    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
}