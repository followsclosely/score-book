import { ActivatedRoute } from '@angular/router';
import { Inject, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AbstractRoundBasedGame, RoundDetails, AbstractRound, RoundMode, AbstractRoundFormComponent, RoundContext } from '../abstract-round-based-game';

export class HeartsHand extends AbstractRound {
  constructor(
    number? : number
  ){
    super(number);
  }

  push2(score:number, shootMoon:boolean, stopShootMoon: boolean){
    var detail = new RoundDetails(score);
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
export class HeartsComponent extends AbstractRoundBasedGame<HeartsHand> implements OnInit {

  public match:Match = null;

  private roundDialogRef: MatDialogRef<HeartsRoundComponent>;

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

      this.addRound(new HeartsHand(1).push(10).push(3).push(7).push(6));
      this.addRound(new HeartsHand(2).push(0).push(23).push2(3, false, true).push(0));
      this.addRound(new HeartsHand(3).push2(0, true, false).push(26).push(26).push(26));
      this.dataSource.data = this.rounds;
    }

    super._ngOnInit(this.match);
  }

  openAddRoundDialog(){
    var hand = new HeartsHand();
    this.match.factions.forEach(faction => {
      hand.details.push(new RoundDetails(0));
    });
 
    this.dialog.open(HeartsRoundComponent, { 
      data: new RoundContext(hand, RoundMode.Create, this) 
    } );
  }

  openEditRoundDialog(round : HeartsHand){
    this.dialog.open(HeartsRoundComponent, {
      data: new RoundContext(round, RoundMode.Edit, this) 
    });
  }

}

@Component({
  templateUrl: './hearts-hand.component.html',
  styleUrls: ['./hearts.component.css']
})
export class HeartsRoundComponent extends AbstractRoundFormComponent {
  constructor(
    logger: LogService,
    dialogRef:  MatDialogRef<HeartsRoundComponent>,
    @Inject(MAT_DIALOG_DATA) context : RoundContext
  ) {
    super(logger, dialogRef, context);
  }

  shootTheMoonChange(i, event){
    
    if( event.checked ){
      //Add the flag
      this.context.round.details[i].flags.push("SHOOT_THE_MOON");
      if( this.context.round.details[i].score == 0 ){
        this.context.round.details.forEach((detail, index) => {
          if( index != i ){
            detail.score = 26;
          }
        });
      }
    } else {
      //Remove the flag
      const index = this.context.round.details[i].flags.indexOf("SHOOT_THE_MOON", 0);
      if (index > -1) {
        this.context.round.details[i].flags.splice(index, 1);
      } 
    }

    this.onScoreChange(null);
  }

}
