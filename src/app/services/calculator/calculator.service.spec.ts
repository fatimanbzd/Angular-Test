import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from '../logger/logger.service';

function setup() {
  const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);

  TestBed.configureTestingModule({
    providers: [
      CalculatorService,
      {
        provide: LoggerService,
        useValue: mockLoggerService,
      },
    ],
  });

  const calculatorService = TestBed.inject(CalculatorService);
  const loggerServiceSpy = TestBed.inject(
    LoggerService
  ) as jasmine.SpyObj<LoggerService>;

  return { calculatorService, loggerServiceSpy };
}
describe('CalculatorService', () => {
  it('should add two numbers', () => {
    const { calculatorService, loggerServiceSpy } = setup();

    let result = calculatorService.add(1, 2);
    expect(result).toBe(3);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
  it('should substract two numbers', () => {
    const { calculatorService, loggerServiceSpy } = setup();
    let result = calculatorService.substract(1, 2);
    expect(result).toBe(-1);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});
