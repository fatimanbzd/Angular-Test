import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

  constructor(private loggerService: LoggerService) { }
  
  add(n1: number, n2: number) {
    this.loggerService.log('add operation is called');
    return n1 + n2;
  }

  substract(n1: number, n2: number) {
    this.loggerService.log('substract operation is called');
    return n1 - n2;
  }
}
