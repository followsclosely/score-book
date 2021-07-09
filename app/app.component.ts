import { Component } from '@angular/core';
import { LogService } from './log-service.service';
import { MyFormComponent } from './my-form/my-form.component';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  public version = VERSION;
  public openMenu: boolean = false;
  public isOver = false;

  fileNameDialogRef: MatDialogRef<MyFormComponent>;

  constructor(private logger:LogService, private dialog: MatDialog) {}

  openDialog(){
    this.logger.log('Stink')
  }

  openAddMatchDialog() {
    this.fileNameDialogRef = this.dialog.open(MyFormComponent,{
      // minHeight:'400px',
      // minWidth:'300px'
    });
  }


  

  clickMenu(){
    this.openMenu = !this.openMenu;
  }

  hello(mex: string){
      alert(mex);
  }

}
