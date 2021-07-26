import { MatTableDataSource } from '@angular/material/table';
import { LogService } from '../log-service.service';
import { Match, Faction } from '../match';
import { Player } from '../player';


export class HandDetails {
  public flags = new Array<string>();

  constructor(
    public score : number,
    public totalScore : number = 0,
  ){}
}

export class AbstractHand {
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

export class AbstractTurnBasedGame<H extends AbstractHand> {

  public hands = new Array<H>();
  public dataSource = new MatTableDataSource<H>();

  public players = new Array<Player>();
  public columnsToDisplay: string[] = [];

  constructor(
    protected logger: LogService,
  ){ }

  _ngOnInit(match:Match){

    this.columnsToDisplay.push("Hand");
    match.factions.forEach(faction => {

      this.players.push(...faction.players);

      if( faction.name != null ){
        this.columnsToDisplay.push(faction.name);
      } else {
        this.columnsToDisplay.push(faction.players.map(p => p.name).join('/'));
      }

    });
  }

  addHand(hand:H){
    hand.number = this.hands.length+1;
    
    if( hand.number > 1) {
      var lastHand = this.hands[this.hands.length-1];
      for( var j=0; j<hand.details.length; j++){
        hand.details[j].totalScore = lastHand.details[j].totalScore + lastHand.details[j].score;
      }
    }

    this.hands.push(hand);
    this.dataSource.data = this.hands;
  }

  getTotal(i : number) {
    if (i == 0 ) return "";
    return this.hands.map(hand => hand.details[i-1].score).reduce((acc, value) => acc + value, 0);
  }

  getPlayersAsString(faction:Faction, delim:string){
    return faction.players.map(player => player.name).join(delim);
  }

}