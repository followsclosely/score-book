import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    private logger: LogService,
    private route: ActivatedRoute,
    private location: Location
  ) { 

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.logger.log(id);
  }

}