import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { Preferences, PreferencesService } from '../preferences.service';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.css']
})
export class PreferencesFormComponent implements OnInit {

  public preferences:Preferences;

  constructor(
    private preferencesService: PreferencesService,
    private dialogRef:  MatDialogRef<PreferencesFormComponent>,
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