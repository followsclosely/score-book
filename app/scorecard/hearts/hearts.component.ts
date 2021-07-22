import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import {MatDialog, MatDialogRef} from '@angular/material';


export class HandDetails {
  public flags = new Array<string>();

  constructor(
    public score : number
  ){}
}
export class Hand {
  public details = new Array<HandDetails>();
  constructor(
    public number : number
  ){}

  push(score:number){
    this.details.push(new HandDetails(score));
    return this;
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
}



@Component({
  templateUrl: './hearts.component.html',
  styleUrls: ['./hearts.component.css']
})
export class HeartsComponent implements OnInit {

  public columnsToDisplay: string[] = [];
  public match:Match = null;
  public dataSource = new Array<Hand>();

  private handDialogRef: MatDialogRef<GenericHandComponent>;

  constructor(
    private logger: LogService,
    private route: ActivatedRoute,
    private location: Location,
    private matchService:MatchService, 
    private dialog: MatDialog,
  ) { 

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

      this.dataSource.push(new Hand(1).push(10).push(3).push(7).push(6));
      this.dataSource.push(new Hand(2).push(0).push(23).push2(3, false, true).push(0));
      this.dataSource.push(new Hand(3).push2(0, true, false).push(26).push(26).push(26));
    }

    this.columnsToDisplay.push("Hand");
    this.match.factions.forEach(faction => {
      this.columnsToDisplay.push(faction.name);
    });

  }

  openAddHandDialog(){
    this.handDialogRef = this.dialog.open(GenericHandComponent);
    this.handDialogRef.componentInstance.parent = this;
  }

}

@Component({
  templateUrl: './hearts-hand.component.html',
  styleUrls: ['./hearts.component.css']
})
export class GenericHandComponent implements OnInit {

  public parent : HeartsComponent;

  constructor(
    private logger: LogService,
  ) { }

  ngOnInit() {
  }
}