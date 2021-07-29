import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable()
export class LogService {
    log(msg:string, bean: any) {
        console.log(formatDate(Date.now(), 'yyyy-MM-dd hh:mm', 'en-US') + ": " + msg + " - " + JSON.stringify(bean));
    }
}