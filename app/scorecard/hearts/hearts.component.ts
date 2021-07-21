import { Component, OnInit } from '@angular/core';
import { Match, GameType } from '../../match';
import { LogService } from '../../log-service.service';

@Component({
  selector: 'app-hearts',
  templateUrl: './hearts.component.html',
  styleUrls: ['./hearts.component.css']
})
export class HeartsComponent implements OnInit {

  private match:Match;

  constructor(
    private logger:LogService
  ) { }

  ngOnInit() {
  }

}