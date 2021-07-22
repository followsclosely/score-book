import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Match, GameType, Faction } from '../../match';
import { LogService } from '../../log-service.service';
import { MatchService } from '../../match-service.service';

export interface Hand {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Hand[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-hearts',
  templateUrl: './hearts.component.html',
  styleUrls: ['./hearts.component.css']
})
export class HeartsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  public match:Match = null;


  public dataSource = ELEMENT_DATA;

  constructor(
    private logger: LogService,
    private route: ActivatedRoute,
    private location: Location,
    private matchService:MatchService, 
  ) { 

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.logger.log(id);
    //this.match = this.matchService.getMatch(id);

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
  }

}