import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import { Preferences, PreferencesService } from '../preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  public preferences:Preferences;

  constructor(
    private preferencesService: PreferencesService,
    private dialogRef:  MatDialogRef<PreferencesComponent>,
  ) {
    this.preferences = preferencesService.getPreferences();
  }

  ngOnInit() {
  }

  onSubmit(){
    this.preferencesService.storePreferences(this.preferences);
    this.dialogRef.close();
  }
}