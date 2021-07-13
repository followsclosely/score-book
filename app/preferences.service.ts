import { Injectable } from '@angular/core';

@Injectable()
export class PreferencesService {

  private preferences = new Preferences();

  constructor() { 
  }

  getPreferences(){
    return this.preferences;
  }

  storePreferences(preferences:Preferences){
    
  }

}

export class Preferences {
  constructor(
    public showToolTips: boolean = true,
  ) {}
}