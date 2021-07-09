import { Component } from '@angular/core';
import { LogService } from './log-service.service';

import { PreferencesService } from './preferences.service';
import { PreferencesFormComponent } from './preferences-form/preferences-form.component';

import { MyFormComponent } from './my-form/my-form.component';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public showToolTips = false;
  
  public version = VERSION;
  //Holds if the hamburger menu is opened.
  public openMenu: boolean = false;
  public isOver = false;

  fileNameDialogRef: MatDialogRef<MyFormComponent>;
  preferencesDialogRef: MatDialogRef<PreferencesFormComponent>;

  constructor(
    private logger: LogService, 
    private dialog: MatDialog,
    private preferences: PreferencesService) 
  {
    this.showToolTips = preferences.getValue('showToolTips', false);
  }

  openDialog(){
    this.logger.log('Stink')
  }

  openAddMatchDialog() {
    this.fileNameDialogRef = this.dialog.open(MyFormComponent,{
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
