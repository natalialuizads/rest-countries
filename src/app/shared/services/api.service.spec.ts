import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`Dado o ApiService
      Quando o método getAllCountries retornar com sucesso
      Então deve retornar todos paises`, inject(
    [HttpTestingController, ApiService],
    (httpMock: HttpTestingController, apiService: ApiService) => {
      let requestResponse: {} | undefined;

      const mockCountries = [
        {
          name: 'España',
          region: 'Europa',
          population: 47000000,
          flag: 'https://flags.com/spain',
        },
      ];

      apiService.getAllCountries().subscribe((res) => {
        requestResponse = res;
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' && req.urlWithParams === `${environment}/all`
        );
      });

      mockReq.flush(mockCountries);
      httpMock.verify();

      expect(requestResponse).toEqual(mockCountries);
    }
  ));

  it(`Dado o ApiService
      Quando o método getAllCountries retornar com erro
      Então deve repassar o erro`, inject(
    [HttpTestingController, ApiService],
    (httpMock: HttpTestingController, apiService: ApiService) => {
      const status = 500;
      const statusText = 'Internal Server Error';
      const errorEvent = new ErrorEvent('API error');

      let actualError: HttpErrorResponse | undefined;

      apiService.getAllCountries().subscribe({
        next: () => fail('next handler must not be called'),
        error: (error: HttpErrorResponse) => (actualError = error),
        complete: () => fail('next handler must not be called'),
      });

      const mockRequest = httpMock.expectOne(`${environment}/all`);

      mockRequest.error(errorEvent, { status, statusText });

      httpMock.verify();

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.error).toBe(errorEvent);
      expect(actualError.status).toBe(status);
      expect(actualError.statusText).toBe(statusText);
    }
  ));

  it(`Dado o ApiService
      Quando o método getCountryByName retornar com sucesso
      Então deve retornar o pais pesquisado`, inject(
    [HttpTestingController, ApiService],
    (httpMock: HttpTestingController, apiService: ApiService) => {
      let requestResponse: {} | undefined;

      const mockCountry = [
        {
          name: 'España',
          region: 'Europa',
          population: 47000000,
          flag: 'https://flags.com/spain',
        },
      ];

      apiService.getCountryByName('espanha').subscribe((res) => {
        requestResponse = res;
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.urlWithParams === `${environment}/name/espanha`
        );
      });

      mockReq.flush(mockCountry);
      httpMock.verify();

      expect(requestResponse).toEqual(mockCountry);
    }
  ));

  it(`Dado o ApiService
      Quando o método getCountryByName retornar com erro
      Então deve repassar o erro`, inject(
    [HttpTestingController, ApiService],
    (httpMock: HttpTestingController, apiService: ApiService) => {
      const status = 500;
      const statusText = 'Internal Server Error';
      const errorEvent = new ErrorEvent('API error');

      let actualError: HttpErrorResponse | undefined;

      apiService.getCountryByName('espanha').subscribe({
        next: () => fail('next handler must not be called'),
        error: (error: HttpErrorResponse) => (actualError = error),
        complete: () => fail('next handler must not be called'),
      });

      const mockRequest = httpMock.expectOne(`${environment}/name/espanha`);

      mockRequest.error(errorEvent, { status, statusText });

      httpMock.verify();

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.error).toBe(errorEvent);
      expect(actualError.status).toBe(status);
      expect(actualError.statusText).toBe(statusText);
    }
  ));
});
