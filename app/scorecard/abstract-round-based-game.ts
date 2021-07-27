import { MatTableDataSource } from '@angular/material/table';
import { LogService } from '../log-service.service';
import { Match, Faction } from '../match';
import { Player } from '../player';


export class RoundDetails {
  public flags = new Array<string>();

  constructor(
    public score : number,
    public totalScore : number = 0,
  ){}
}

export class AbstractRound {
  public details = new Array<RoundDetails>();
  constructor(
    public number? : number
  ){}

  push(score:number){
    this.details.push(new RoundDetails(score));
    return this;
  }

  getTotal() {
    return this.details.map(detail => detail.score).reduce((acc, value) => acc + value, 0);
  }
}

export class AbstractRoundBasedGame<H extends AbstractRound> {

  public rounds = new Array<H>();
  public dataSource = new MatTableDataSource<H>();

  public players = new Array<Player>();
  public columnsToDisplay: string[] = [];

  constructor(
    protected logger: LogService,
  ){ }

  _ngOnInit(match:Match){

    this.columnsToDisplay.push("Round");
    match.factions.forEach(faction => {
      this.players.push(...faction.players);

      //Default the faction name if none was specified
      if( faction.name != null ){
        this.columnsToDisplay.push(faction.name);
      } else {
        this.columnsToDisplay.push(faction.players.map(p => p.name).join('/'));
      }
    });
  }

  addRound(round:H){
    round.number = this.rounds.length+1;
    
    if( round.number > 1) {
      var lastRound = this.rounds[this.rounds.length-1];
      for( var j=0; j<round.details.length; j++){
        round.details[j].totalScore = lastRound.details[j].totalScore + lastRound.details[j].score;
      }
    }

    this.rounds.push(round);
    this.dataSource.data = this.rounds;
  }

  getTotal(i : number) {
    if (i == 0 ) return "";
    return this.rounds.map(round => round.details[i-1].score).reduce((acc, value) => acc + value, 0);
  }

  getPlayersAsString(faction:Faction, delim:string){
    return faction.players.map(player => player.name).join(delim);
  }

}