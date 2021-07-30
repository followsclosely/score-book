import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { LogService } from '../log.service';
import {MatDialogRef} from '@angular/material/dialog';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  private player!: Player;

  constructor(
    private dialogRef:  MatDialogRef<PlayerComponent>,
    private groupService: GroupService,
    private logger:LogService
  ) { }

  ngOnInit() {
    this.player = new Player();
    this.logger.log('PlayerFormComponent:ngOnInit');
  }

  onSubmit() {
    this.groupService.addPlayer(this.player);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
