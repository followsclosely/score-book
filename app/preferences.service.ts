import { Injectable } from '@angular/core';

@Injectable()
export class PreferencesService {

  private preferences = new Preferences();

  constructor() { 
  }

  getPreferences(){
    return this.preferences;
  }

}

export class Preferences {
  constructor(
    public showToolTips: boolean = true,
  ) {}
}