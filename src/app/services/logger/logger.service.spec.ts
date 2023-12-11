import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[LoggerService]
    });

    loggerService = TestBed.inject(LoggerService);
  });
  it('should not have any messages at starting', () => {
    expect(loggerService.messages.length).toBe(0);
  });
  it('should add the messaged when log is called', () => {

    loggerService.log('foo');
    expect(loggerService.messages.length).toBe(1);
  });

  it('should clear all the messages when clear is called', () => {
    loggerService.log('foo');
    loggerService.clear();
    expect(loggerService.messages.length).toBe(0);
  });
});
