import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
 // MatTableModule,


import { AppComponent } from './app.component';
import { ScorePipe } from './score.pipe';
import { PreferencesComponent } from './preferences/preferences.component';
import { PlayerComponent } from './player/player.component';


@NgModule({
  declarations: [
    AppComponent,
    ScorePipe,
    PreferencesComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatStepperModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PlayerComponent
  ]
})
export class AppModule { }
