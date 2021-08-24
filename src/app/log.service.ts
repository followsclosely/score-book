import { Injectable } from '@angular/core';

import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {
    this.log("Instantiating LogService...");
  }

  log(msg:string, bean?: any) {
    if ( bean == null ){
      console.log(formatDate(Date.now(), 'yyyy-MM-dd hh:mm', 'en-US') + ": " + msg);
    } else {
      console.log(formatDate(Date.now(), 'yyyy-MM-dd hh:mm', 'en-US') + ": " + msg + " - " + JSON.stringify(bean));
    }
  }
}
