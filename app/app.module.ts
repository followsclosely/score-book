import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { NgModule } from '@angular/core';

import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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


@NgModule({
  entryComponents: [PreferencesFormComponent, MatchFormComponent],
  declarations: [
    AppComponent,
    PreferencesFormComponent,
    MatchFormComponent
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
    MatStepperModule
  ],
  providers: [MatchService, LogService, PreferencesService ],
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



