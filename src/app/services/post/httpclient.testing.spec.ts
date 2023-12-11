import { HttpClient } from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

let testUrl = '/data';
interface Data{
    name: string;
}
describe('http client testing module', () => {
    
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    
    beforeEach(() => { 
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });


    it('should call the testurl with get request', () => {

        const testData: Data = { name: 'Fatima Nabi' };

        httpClient.get<Data>(testUrl).subscribe(data => {
            //expect(data).toEqual(testData);
        });

        const request = httpTestingController.expectOne('/data');
        request.flush({ name: 'Fatima Nabi' });
        
        expect(request.request.method).toBe('GET');
    });

    
})