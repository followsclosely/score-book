import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { LogService } from '../log-service.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  public player:Player;

  constructor(
    private dialogRef:  MatDialogRef<PlayerFormComponent>,
    private logger:LogService
  ) { }

  ngOnInit() {
    this.player = new Player();
    this.logger.log('PlayerFormComponent:ngOnInit');
  }

  onSubmit() {
    //alert('Thanks for submitting! Data: ' + JSON.stringify(this.game));
    this.logger.log(this.player);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}