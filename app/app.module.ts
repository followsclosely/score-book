import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { NgModule } from '@angular/core';

import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';


import { AppComponent } from './app.component';
import { MyFormComponent } from './my-form/my-form.component';
import { MatchService } from './match-service.service';
import { LogService } from './log-service.service';



@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [MatchService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }



// original

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// import { AppComponent } from './app.component';
// import { HelloComponent } from './hello.component';

// @NgModule({
//   imports:      [ BrowserModule, FormsModule ],
//   declarations: [ AppComponent, HelloComponent ],
//   bootstrap:    [ AppComponent ]
// })
// export class AppModule { }



