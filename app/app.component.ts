import { Component } from '@angular/core';
import { LogService } from './log-service.service';

import { Preferences, PreferencesService } from './preferences.service';
import { PreferencesFormComponent } from './preferences-form/preferences-form.component';

import { GroupService } from './group.service';
import { MatchFormComponent } from './match-form/match-form.component';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public preferences:Preferences;
  
  public version = VERSION;
  //Holds if the hamburger menu is opened.
  public openMenu: boolean = false;
  public isOver = false;

  matchFormDialogRef: MatDialogRef<MatchFormComponent>;
  preferencesDialogRef: MatDialogRef<PreferencesFormComponent>;

  constructor(
    private logger: LogService, 
    private dialog: MatDialog,
    private groupService: GroupService,
    private preferencesService: PreferencesService) 
  {
    this.preferences = preferencesService.getPreferences();
  }

  openAddMatchDialog() {
    this.matchFormDialogRef = this.dialog.open(MatchFormComponent,{
      // minHeight:'400px',
      // minWidth:'300px'
    });
    this.openMenu = false;
  }

  openPreferencesDialog() {
    this.preferencesDialogRef = this.dialog.open(PreferencesFormComponent);
    this.openMenu = false;
  }

  

  clickMenu(){
    this.openMenu = !this.openMenu;
  }

  hello(mex: string){
      alert(mex);
  }

}
