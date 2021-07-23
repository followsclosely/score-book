import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';


export class HandDetails {
  public flags = new Array<string>();

  constructor(
    public score : number
  ){}
}
export class Hand {
  public details = new Array<HandDetails>();
  constructor(
    public number? : number
  ){}

  push(score:number){
    this.details.push(new HandDetails(score));
    return this;
  }

  getTotal() {
    return this.details.map(detail => detail.score).reduce((acc, value) => acc + value, 0);
  }
}

@Component({
  selector: 'app-rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookComponent implements OnInit {
  public columnsToDisplay: string[] = [];
  public match:Match = null;

  public dataSource = new MatTableDataSource<Hand>();
  public hands = new Array<Hand>();

  private handDialogRef: MatDialogRef<RookHandComponent>;

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

    this.columnsToDisplay.push("Hand");
    this.match.factions.forEach(faction => {
      if( faction.name != null ){
        this.columnsToDisplay.push(faction.name);
      } else {
        var name = faction.players.map(p => p.name).join('/');;
        this.columnsToDisplay.push(name);
      }
    });
  }

  addHand(hand:Hand){
    hand.number = this.hands.length+1;
    this.hands.push(hand);
    this.dataSource.data = this.hands;
    
  }
  openAddHandDialog(){
    this.handDialogRef = this.dialog.open(RookHandComponent);
    this.handDialogRef.componentInstance.parent = this;
  }

  getTotal(i : number) {
    if (i == 0 ) return "";
    return this.hands.map(hand => hand.details[i-1].score).reduce((acc, value) => acc + value, 0);
  }

}

@Component({
  templateUrl: './rook-hand.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookHandComponent implements OnInit {

  public parent : RookComponent;
  public hand:Hand;
  public totalPoints = 0;

  constructor(
    private logger: LogService,
    private dialogRef:  MatDialogRef<RookHandComponent>,
  ) { }

  ngOnInit() {
    this.logger.log('GenericHandComponent#ngOnInit()');
    this.hand = new Hand();
    this.parent.match.factions.forEach(faction => {
      this.hand.details.push(new HandDetails(0));
    });
  }
  onScoreChange(event){
    this.totalPoints = this.hand.getTotal();
  }

  onSubmit(){
    //this.logger.log(this.parent.dataSource);
    this.parent.addHand(this.hand);
    this.dialogRef.close();
  }
}