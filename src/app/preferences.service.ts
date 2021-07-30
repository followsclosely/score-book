import { Injectable } from '@angular/core';
import { LogService } from './log.service';

export class Preferences {
  constructor(
    public showToolTips: boolean = true,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private preferences = new Preferences();

  constructor(
    private logger : LogService
  ) {
    this.logger.log("Instantiating Preferences...", );
  }

  getPreferences(){
    return this.preferences;
  }

  storePreferences(preferences:Preferences){
    this.preferences = preferences;
  }

}
