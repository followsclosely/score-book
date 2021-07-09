import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../preferences.service';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.css']
})
export class PreferencesFormComponent implements OnInit {

  public showToolTips;

  constructor(private preferences: PreferencesService) {
    this.showToolTips = preferences.getValue('showToolTips', false);
  }

  ngOnInit() {
  }

}