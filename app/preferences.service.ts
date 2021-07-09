import { Injectable } from '@angular/core';

@Injectable()
export class PreferencesService {

  map = new Map<string, any>();

  constructor() { 
    this.map.set("sdfsdf", true);
  }

  getValue(key:string, defaultValue:any){
    return this.map.has(key) ? this.map.get(key) : defaultValue;
  }

  setValue(key:string, value:any){
    this.map.set(key,value);
  }
}
