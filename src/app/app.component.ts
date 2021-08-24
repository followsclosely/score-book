import { Component, VERSION } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { LogService } from './log.service';

import { Preferences, PreferencesService } from './preferences.service';
import { PreferencesComponent } from './preferences/preferences.component';
import { PlayerComponent } from './player/player.component';

import { GroupService } from './group.service';
//import { MatchFormComponent } from './match-form/match-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  public preferences:Preferences;
  
  public version = VERSION;
  //Holds if the hamburger menu is opened.
  public openMenu: boolean = false;
  public isOver = false;

//  matchFormDialogRef: MatDialogRef<MatchFormComponent>;
//    preferencesDialogRef: MatDialogRef<PreferencesComponent>;
//  playerDialogRef: MatDialogRef<PlayerFormComponent>;

  constructor(
    private logger: LogService, 
    private dialog: MatDialog,
    private groupService: GroupService,
    private preferencesService: PreferencesService) 
  {
    this.preferences = preferencesService.getPreferences();
  }

  openAddPlayerDialog(){
    const dialogRef = this.dialog.open(PlayerComponent, {data:this});

    dialogRef.afterClosed().subscribe(result => {
      this.logger.log("Dialog", result);
    });

    this.openMenu = false;
  }

  openAddMatchDialog() {
//    this.matchFormDialogRef = this.dialog.open(MatchFormComponent);
    this.openMenu = false;


  }

  openPreferencesDialog() {
    this.logger.log("Stink!");
    this.dialog.open(PreferencesComponent);
    this.openMenu = false;
  }

  

  clickMenu(){
    this.openMenu = !this.openMenu;
  }

  hello(mex: string){
      alert(mex);
  }

}

