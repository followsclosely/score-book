import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Inject, Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import { Player } from '../../player';
import { AbstractRoundBasedGame, RoundDetails, AbstractRound, RoundMode, AbstractRoundFormComponent, RoundContext } from '../abstract-round-based-game';

export class Bid {
  constructor(
    public player? : Player,
    public points? : number,
    public trump?
  ){}

  isBidWinner(faction : Faction){
    return (faction.players.indexOf(this.player) !=- 1);
  }
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

  constructor(
    logger: LogService,
    private route: ActivatedRoute,
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
      this.match = new Match(id, new GameType("rook",  "Rook"), null, null, 2, true);

      var parents = new Faction("Parents");
      var matthew = new Player(100, "Matthew");
      parents.addPlayer(matthew);
      var estella = new Player(101, "Estella");
      parents.addPlayer(estella);
      this.match.factions.push(parents);

      var kids = new Faction("Kids");
      var hannah = new Player(102, "Hannah");
      kids.addPlayer(hannah);
      var olivia = new Player(103, "Olivia");
      kids.addPlayer(olivia);
      this.match.factions.push(kids);

      this.addRound(new RookHand(1).push(145).push(35).setBid(matthew, 125, "green" ));
      this.addRound(new RookHand(1).push(20).push(160).setBid(hannah, 135, "red" ));
      this.addRound(new RookHand(1).push(45).push(135).setBid(olivia, 115, "black" ));
      this.addRound(new RookHand(1).push(0).push(0).setBid(matthew, 120, "yellow" ));
      this.dataSource.data = this.rounds;
    }

    this._ngOnInit(this.match);
  }

  openAddRoundDialog(){
    var hand = new RookHand();
    this.match.factions.forEach(faction => {
      hand.details.push(new RoundDetails(0));
    });
 
    this.dialog.open(RookRoundComponent, { 
      data: new RoundContext(hand, RoundMode.Create, this) 
    } );
  }

  openEditRoundDialog(round : RookHand){
    this.dialog.open(RookRoundComponent, {
      data: new RoundContext(round, RoundMode.Edit, this) 
    });
  }
}

@Component({
  templateUrl: './hand.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookRoundComponent extends AbstractRoundFormComponent {
  constructor(
    logger: LogService,
    dialogRef:  MatDialogRef<AbstractRoundFormComponent>,
    @Inject(MAT_DIALOG_DATA) context : RoundContext
  ) {
    super(logger, dialogRef, context);
  }
}