import { MatTableDataSource } from '@angular/material/table';
import { LogService } from '../log-service.service';
import { Match, Faction } from '../match';
import { Player } from '../player';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export enum RoundMode {
  Create,
  Edit
}

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

export class RoundContext {
  constructor(
    public round : AbstractRound,
    public mode : RoundMode,
    public parent : any
  ){}
}

export class AbstractRoundBasedGame<H extends AbstractRound> {

  public RoundMode = RoundMode;
  public roundMode : RoundMode;

  public rounds = new Array<H>();
  public dataSource = new MatTableDataSource<H>();

  public players = new Array<Player>();
  public columnsToDisplay = new Array<string>();

  constructor(
    protected logger: LogService,
  ){}

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

  addRound(round : H){
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

  removeRound(round : H){
    const index: number = this.rounds.indexOf(round);
    if (index !== -1) {
      this.rounds.splice(index, 1);
      this.dataSource.data = this.rounds;
    } 
  }

  getTotal(i : number) {
    if (i == 0 ) return "";
    return this.rounds.map(round => round.details[i-1].score).reduce((acc, value) => acc + value, 0);
  }

  getPlayersAsString(faction:Faction, delim:string){
    return faction.players.map(player => player.name).join(delim);
  }

}

export class AbstractRoundFormComponent {

  public RoundMode = RoundMode;
  public totalPoints = 0;

  constructor(
    private logger: LogService,
    private dialogRef:  MatDialogRef<AbstractRoundFormComponent>,
    @Inject(MAT_DIALOG_DATA) public context : RoundContext
  ) {}

  onScoreChange(event : any){
    this.totalPoints = this.context.round.getTotal();
  }

  onCancel(){
    this.dialogRef.close();
  }

  onCreate(){
    this.context.parent.addRound(this.context.round);
    this.dialogRef.close();
  }

  onDelete(){
    if(confirm("Are you sure to delete?")) {
      this.context.parent.removeRound(this.context.round);
      this.dialogRef.close();
    }
  }
}