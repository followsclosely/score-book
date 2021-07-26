import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AbstractTurnBasedGame, HandDetails, AbstractHand } from '../abstract-turn-based-game';

export class HeartsHand extends AbstractHand {
  constructor(
    number? : number
  ){
    super(number);
  }

  push2(score:number, shootMoon:boolean, stopShootMoon: boolean){
    var detail = new HandDetails(score);
    if( shootMoon ){
      detail.flags.push("SHOOT_THE_MOON");
    }
    if( stopShootMoon ){
      detail.flags.push("STOPPED_SHOOT_THE_MOON");
    }
    this.details.push(detail);
    return this;
  }

  public getDirection(size:number){
    console.log("number: " + size);
    var number = (this.number) % size;

    switch(number) { 
      case 1: { 
        return 'north_east'
      }
      case 2: { 
        return 'north_west';
      }
      case 3: {
        return 'arrow_upward';
      }
      default: { 
        return 'do_not_disturb';
      } 
   } 
  }
}

@Component({
  templateUrl: './hearts.component.html',
  styleUrls: ['./hearts.component.css']
})
export class HeartsComponent extends AbstractTurnBasedGame<HeartsHand> implements OnInit {

  public match:Match = null;

  private handDialogRef: MatDialogRef<HeartsHandComponent>;

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
        new GameType("hearts",  "Hearts",  4),
        null,
        null,
        4,
        false
      );

      this.match.factions.push(new Faction("Matthew"));
      this.match.factions.push(new Faction("Estella"));
      this.match.factions.push(new Faction("Joel"));
      this.match.factions.push(new Faction("Emily"));

      this.addHand(new HeartsHand(1).push(10).push(3).push(7).push(6));
      this.addHand(new HeartsHand(2).push(0).push(23).push2(3, false, true).push(0));
      this.addHand(new HeartsHand(3).push2(0, true, false).push(26).push(26).push(26));
      this.dataSource.data = this.hands;
    }

    super._ngOnInit(this.match);
  }

  openAddHandDialog(){

    var hand = new HeartsHand();
    this.match.factions.forEach(faction => {
      hand.details.push(new HandDetails(0));
    });

    this.handDialogRef = this.dialog.open(HeartsHandComponent, {
      data: hand
    });
    this.handDialogRef.componentInstance.parent = this;
  }

  openEditHandDialog(hand : HeartsHand){
    this.logger.log("HeartsComponent#openEditHandDialog: " + hand);

    this.handDialogRef = this.dialog.open(HeartsHandComponent, {
      data: hand
    });
    this.handDialogRef.componentInstance.parent = this;
    this.handDialogRef.componentInstance.hand = hand;

  }
}

@Component({
  templateUrl: './hearts-hand.component.html',
  styleUrls: ['./hearts.component.css']
})
export class HeartsHandComponent implements OnInit {

  public parent : HeartsComponent;
  //public hand:HeartsHand;
  public totalPoints = 0;

  constructor(
    private logger: LogService,
    private dialogRef:  MatDialogRef<HeartsHandComponent>,
    @Inject(MAT_DIALOG_DATA) public hand : HeartsHand
  ) { }

  ngOnInit() {
    this.logger.log('GenericHandComponent#ngOnInit()');
    
  }
  onScoreChange(event){
    this.totalPoints = this.hand.getTotal();
  }

  shootTheMoonChange(i, event){
    if( event.checked ){
      //Add the flag
      this.hand.details[i].flags.push("SHOOT_THE_MOON");
      if( this.hand.details[i].score == 0 ){
        this.hand.details.forEach((detail, index) => {
          if( index != i ){
            detail.score = 26;
          }
        });
      }
    } else {
      //Remove the flag
      const index = this.hand.details[i].flags.indexOf("SHOOT_THE_MOON", 0);
      if (index > -1) {
        this.hand.details[i].flags.splice(index, 1);
      } 
    }

    this.onScoreChange(null);
    this.logger.log(event.checked);
  }

  onSubmit(){
    //this.logger.log(this.parent.dataSource);
    this.parent.addHand(this.hand);
    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
}