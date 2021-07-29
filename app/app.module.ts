import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { MatchService } from './match-service.service';
import { LogService } from './log-service.service';
import { PreferencesService  } from './preferences.service';
import { PreferencesFormComponent } from './preferences-form/preferences-form.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { GroupService } from './group.service';
import { PlayerFormComponent } from './player-form/player-form.component';
import { HeartsComponent, HeartsRoundComponent } from './scorecard/hearts/hearts.component';
import { GenericRoundBasedGame, GenericRoundComponent } from './scorecard/generic/generic.component';
import { RookComponent, RookRoundComponent } from './scorecard/rook/rook.component';
import { ScorePipe } from './score.pipe';

@NgModule({
  entryComponents: [
    PreferencesFormComponent, 
    MatchFormComponent, 
    PlayerFormComponent, 
    HeartsRoundComponent,
    RookRoundComponent,
    GenericRoundBasedGame,
    GenericRoundComponent
  ],
  declarations: [
    AppComponent,
    PreferencesFormComponent,
    MatchFormComponent,
    PlayerFormComponent,
    HeartsComponent, HeartsRoundComponent,
    GenericRoundBasedGame, GenericRoundComponent,
    RookComponent, RookRoundComponent, ScorePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatTableModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    RouterModule.forRoot([
      {path: 'scorecard/generic/:id', component: GenericRoundBasedGame},
      {path: 'scorecard/chess/:id', component: GenericRoundBasedGame},
      {path: 'scorecard/hearts/:id', component: HeartsComponent},
      {path: 'scorecard/rook/:id', component: RookComponent},
    ]),
  ],
  providers: [MatchService, LogService, PreferencesService, GroupService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
