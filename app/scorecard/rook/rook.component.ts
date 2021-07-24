import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../player';

export class Bid {
  constructor(
    public player? : Player,
    public points? : number,
    public trump?
  ){}
}

export class HandDetails {
  public flags = new Array<string>();

  constructor(
    public score : number,
    public totalScore : number = 0,
  ){}
}
export class Hand {
  public details = new Array<HandDetails>();
  constructor(
    public number? : number,
    public bid : Bid = new Bid(),
  ){}

  push(score:number){
    this.details.push(new HandDetails(score));
    return this;
  }
  setBid(player? : Player, points? : number, trump?){
    this.bid = new Bid(player, points, trump);
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

  public players = new Array<Player>();

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
      parents.addPlayer(new Player(102, "Hannah"));
      parents.addPlayer(new Player(103, "Olivia"));
      this.match.factions.push(kids);

      this.addHand(new Hand(1).push(145).push(35).setBid(new Player(100, "Matthew"), 125, "green" ));
      this.addHand(new Hand(1).push(20).push(160).setBid(new Player(102, "Hannah"), 135, "red" ));
      this.addHand(new Hand(1).push(45).push(135).setBid(new Player(102, "Olivia"), 115, "black" ));
      this.addHand(new Hand(1).push(0).push(0).setBid(new Player(102, "Matthew"), 120, "yellow" ));
      this.dataSource.data = this.hands;
  
    }

    
    this.columnsToDisplay.push("Hand");
    this.match.factions.forEach(faction => {

      this.players.push(...faction.players);

      if( faction.name != null ){
        this.columnsToDisplay.push(faction.name);
      } else {
        this.columnsToDisplay.push(faction.players.map(p => p.name).join('/'));
      }

    });
  }

  addHand(hand:Hand){

    hand.number = this.hands.length+1;
    this.logger.log("hand.number: " + hand.number);
    this.hands.push(hand);

    for(var i=1; i<this.hands.length; i++){
      var lastHand = this.hands[i-1];
      var hand = this.hands[i];
      for( var j=0; j<hand.details.length; j++){
        hand.details[j].totalScore+= lastHand.details[j].totalScore;
      }
    }

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
  templateUrl: './hand.component.html',
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